import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database, ref, onValue, set, off } from 'firebase/database'
import { type Ref, ref as vueRef, watch, getCurrentInstance, onBeforeUnmount } from 'vue'

// Firebase configuration - will be set by user
let firebaseApp: FirebaseApp | null = null
let database: Database | null = null

/**
 * Initialize Firebase with user's configuration
 * Must be called before using any Firebase features
 */
export function initializeFirebase(config: object) {
  firebaseApp = initializeApp(config)
  database = getDatabase(firebaseApp)
}

/**
 * Check if Firebase is initialized and ready to use
 */
export function isFirebaseReady(): boolean {
  return firebaseApp !== null && database !== null
}

/**
 * Composable for syncing a Vue ref with Firebase Realtime Database
 * Provides two-way sync: local changes push to Firebase, remote changes update local state
 *
 * @param path - Firebase database path (e.g., 'sessions/abc123/combatants')
 * @param defaultValue - Default value if no data exists in Firebase
 * @param serializer - Optional custom serializer for complex objects
 * @param onReady - Optional callback fired when initial data is loaded from Firebase
 * @returns Vue ref that syncs with Firebase
 */
export function useFirebaseSync<T>(
  path: string,
  defaultValue: T,
  serializer?: {
    read: (value: any) => T
    write: (value: T) => any
  },
  onReady?: () => void
): Ref<T> {
  if (!database) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.')
  }

  const localRef = vueRef<T>(defaultValue) as Ref<T>
  const dbRef = ref(database, path)
  let isRemoteUpdate = false
  let isFirstLoad = true

  // Listen for remote changes
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      isRemoteUpdate = true
      const value = snapshot.val()
      localRef.value = serializer ? serializer.read(value) : value
      isRemoteUpdate = false
    } else {
      // Initialize Firebase with default value
      const valueToWrite = serializer ? serializer.write(defaultValue) : defaultValue
      set(dbRef, valueToWrite)
    }

    // Call onReady callback after first load
    if (isFirstLoad && onReady) {
      isFirstLoad = false
      onReady()
    }
  })

  // Push local changes to Firebase
  const stopWatch = watch(
    localRef,
    (newValue) => {
      if (!isRemoteUpdate) {
        const valueToWrite = serializer ? serializer.write(newValue) : newValue
        set(dbRef, valueToWrite).catch((error) => {
          console.error(`Firebase sync error for ${path}:`, error)
        })
      }
    },
    { deep: true }
  )

  // Only register lifecycle hook if we're in a component context
  if (getCurrentInstance()) {
    // We're in a component, register cleanup
    onBeforeUnmount(() => {
      stopWatch()
      off(dbRef)
    })
  }
  // If not in component context, listeners will be cleaned up on page unload

  return localRef
}

/**
 * Generate a random session ID for new combat sessions
 * Uses a combination of timestamp and random characters for uniqueness
 */
export function generateSessionId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
