<script setup lang="ts">
import {computed, ref, watch, onMounted} from "vue";
import {Combatant, Condition, getDefaultCombatants, Visibility} from "./functions.ts";
import {useStorage} from "@vueuse/core";
import DMView from "./DMView.vue";
import PlayerView from "./PlayerView.vue";
import {useFirebaseSync, isFirebaseReady, generateSessionId, waitForFirebase} from "./firebase.ts";
import type {GameSystem} from "./db.ts";

// Check URL for session ID and view mode
const urlParams = new URLSearchParams(window.location.search)
const sessionId = ref<string>(urlParams.get("session") || '')

// Security: Check if this is a DM session
// DM sessions are tracked in localStorage with a security token
const dmSessions = useStorage<string[]>('dmSessions', [])

// Security: Determine view mode
// - If session exists and NOT in dmSessions, force player view (read-only)
// - If session exists and IS in dmSessions, allow DM view
// - If no session but view=player in URL, show player view (offline mode)
// - Otherwise, default DM view
const isSharedPlayerLink = computed(() => {
  return !!sessionId.value && !dmSessions.value.includes(sessionId.value)
})
const isPlayerViewParam = urlParams.get('view') === 'player'
const isDMView = ref<boolean>(!isSharedPlayerLink.value && !isPlayerViewParam)

// Online mode is active when there's a session ID in the URL
const isOnlineMode = computed(() => !!sessionId.value)

// Security: If player tries to remove view=player from URL, redirect back
watch([sessionId, () => window.location.search], () => {
  if (isSharedPlayerLink.value) {
    const currentParams = new URLSearchParams(window.location.search)
    if (currentParams.get('view') !== 'player') {
      // Force player view for shared sessions
      const url = new URL(window.location.href)
      url.searchParams.set('view', 'player')
      window.location.href = url.toString()
    }
  }
}, { immediate: true })

// Get game system setting
const gameSystem = useStorage<GameSystem>('gameSystem', 'pathfinder')

// Custom serializer for Combatant objects
const combatantSerializer = {
  read: (v: any) => {
    if (v) {
      let parsedItems = Array.isArray(v) ? v : JSON.parse(v)
      return parsedItems.map((combatant: any) => {
        return new Combatant(
          combatant.name,
          combatant.totalHP,
          combatant.initiative,
          combatant.currentHP,
          (combatant.conditions || []).map((condition: any) => {
            return new Condition(condition.name, condition.value)
          }),
          combatant.visibility,
          combatant.tempHP || 0,
          combatant.maxTempHP || 0
        )
      })
    }
    return getDefaultCombatants(gameSystem.value)
  },
  write: (v: any) => v // Firebase handles JSON serialization
}

/**
 * State management that switches between localStorage (offline) and Firebase (online)
 */
let _turn: any = null
let _round: any = null
let _combatants: any = null
const isInitialized = ref(false)

const turn = computed({
  get: () => _turn?.value ?? 0,
  set: (v) => { if (_turn) _turn.value = v }
})

const round = computed({
  get: () => _round?.value ?? 1,
  set: (v) => { if (_round) _round.value = v }
})

const combatants = computed({
  get: () => _combatants?.value ?? [],
  set: (v) => { if (_combatants) _combatants.value = v }
})

// Initialize state - this will be set in onMounted after Firebase is ready
function initializeState() {
  const shouldUseFirebase = isOnlineMode.value && sessionId.value && isFirebaseReady()

  if (shouldUseFirebase) {
    // For DM: Load existing localStorage data to use as defaults
    let defaultTurn = 0
    let defaultRound = 1
    let defaultCombatantsData = getDefaultCombatants(gameSystem.value)

    if (isDMView.value && !isSharedPlayerLink.value) {
      // Try to load existing localStorage data
      try {
        const storedTurn = localStorage.getItem('turn')
        const storedRound = localStorage.getItem('round')
        const storedCombatants = localStorage.getItem('combatants')

        if (storedTurn) defaultTurn = JSON.parse(storedTurn)
        if (storedRound) defaultRound = JSON.parse(storedRound)
        if (storedCombatants) {
          const parsedCombatants = JSON.parse(storedCombatants)
          defaultCombatantsData = parsedCombatants.map((combatant: any) => {
            return new Combatant(
              combatant.name,
              combatant.totalHP,
              combatant.initiative,
              combatant.currentHP,
              (combatant.conditions || []).map((condition: any) => {
                return new Condition(condition.name, condition.value)
              }),
              combatant.visibility,
              combatant.tempHP || 0,
              combatant.maxTempHP || 0
            )
          })
        }
      } catch (e) {
        // If loading fails, use defaults
        console.error('Error loading localStorage data:', e)
      }
    }

    // Online mode with Firebase - use localStorage data as defaults
    // Track when all Firebase data is loaded
    let loadedCount = 0
    const totalToLoad = 3
    const markAsLoadedIfReady = () => {
      loadedCount++
      if (loadedCount === totalToLoad) {
        isInitialized.value = true
      }
    }

    _turn = useFirebaseSync(`sessions/${sessionId.value}/turn`, defaultTurn, undefined, markAsLoadedIfReady)
    _round = useFirebaseSync(`sessions/${sessionId.value}/round`, defaultRound, undefined, markAsLoadedIfReady)
    _combatants = useFirebaseSync(
      `sessions/${sessionId.value}/combatants`,
      defaultCombatantsData,
      combatantSerializer,
      markAsLoadedIfReady
    )

    // For DM: Also sync to localStorage as backup (but not for players)
    if (isDMView.value && !isSharedPlayerLink.value) {
      watch(_turn, (newValue) => {
        localStorage.setItem('turn', JSON.stringify(newValue))
      })
      watch(_round, (newValue) => {
        localStorage.setItem('round', JSON.stringify(newValue))
      })
      watch(_combatants, (newValue) => {
        localStorage.setItem('combatants', JSON.stringify(newValue))
      }, { deep: true })
    }
  } else {
    // Offline mode with localStorage (DM only)
    _turn = useStorage('turn', 0)
    _round = useStorage('round', 1)
    _combatants = useStorage(
      'combatants',
      getDefaultCombatants(gameSystem.value),
      undefined,
      {
        serializer: {
          read: (v: any) => {
            if (v) {
              let parsedItems = JSON.parse(v)
              return parsedItems.map((combatant: Combatant) => {
                return new Combatant(
                  combatant.name,
                  combatant.totalHP,
                  combatant.initiative,
                  combatant.currentHP,
                  combatant.conditions.map((condition: Condition) => {
                    return new Condition(condition.name, condition.value)
                  }),
                  combatant.visibility,
                  combatant.tempHP || 0,
                  combatant.maxTempHP || 0
                )
              })
            }
            return getDefaultCombatants(gameSystem.value)
          },
          write: (v: any) => JSON.stringify(v)
        }
      }
    )

    // Offline mode is synchronous, mark as initialized immediately
    isInitialized.value = true
  }

  // Note: For online mode, isInitialized is set in markAsLoadedIfReady callback
}

// Wait for Firebase to initialize, then set up state
onMounted(async () => {
  // If online mode, wait for Firebase to be ready
  if (isOnlineMode.value && sessionId.value) {
    const firebaseReady = await waitForFirebase(5000)
    if (!firebaseReady) {
      console.error('Firebase failed to initialize within timeout')
    }
  }

  initializeState()
})

// Function to enable online mode (called from DM view toggle)
function enableOnlineMode() {
  if (!sessionId.value && isDMView.value) {
    // Generate new session ID when enabling online mode
    const newSessionId = generateSessionId()
    sessionId.value = newSessionId

    // Register this as a DM session for security
    if (!dmSessions.value.includes(newSessionId)) {
      dmSessions.value = [...dmSessions.value, newSessionId]
    }

    const url = new URL(window.location.href)
    url.searchParams.set('session', newSessionId)
    // Remove view parameter if it exists (DM shouldn't have it)
    url.searchParams.delete('view')
    window.history.pushState({}, '', url.toString())

    // Reload to reinitialize with Firebase
    window.location.reload()
  }
}

// Function to disable online mode (called from DM view toggle)
function disableOnlineMode() {
  if (sessionId.value && isDMView.value) {
    // Remove session from URL when disabling online mode
    const url = new URL(window.location.href)
    url.searchParams.delete('session')
    window.history.pushState({}, '', url.toString())
    sessionId.value = ''

    // Reload to reinitialize with localStorage
    window.location.reload()
  }
}

// Function to handle online mode toggle from DM view
function toggleOnlineMode(value: boolean) {
  if (value) {
    enableOnlineMode()
  } else {
    disableOnlineMode()
  }
}

/**
 * Sorts combatants by initiative (highest first)
 * Ties are broken alphabetically by name
 */
const orderedCombatants = computed(() => {
  const list = combatants.value
  if (!Array.isArray(list)) return []
  return [...list].sort((a: Combatant, b: Combatant) => {
    return b.initiative - a.initiative === 0 ? a.name > b.name ? 1 : -1 : b.initiative - a.initiative
  })
})

function reset() {
  turn.value = 0
  round.value = 1
}

/**
 * Advances to the next turn, skipping hidden combatants
 * Increments round when cycling back to the top of initiative order
 * Does nothing if all combatants are hidden
 */
function nextTurn() {
  if (orderedCombatants.value.every((combatant: Combatant) => combatant.visibility === Visibility.None)) {
    return
  }

  let newTurn: number = turn.value

  do {
    newTurn++

    if (newTurn >= orderedCombatants.value.length) {
      newTurn = 0
      round.value++
    }
  } while (newTurn <= orderedCombatants.value.length - 1 && orderedCombatants.value[newTurn].visibility === Visibility.None)

  turn.value = newTurn
}

function addCombatant(name: string, HP: number, initiative: number, visibility: Visibility): void {
  combatants.value.push(new Combatant(name, HP, initiative, HP, [], visibility, 0, 0))
}

function removeCombatant(index: number): void {
  // The index comes from orderedCombatants (sorted array),
  // but we need to remove from the unsorted combatants array
  const combatantToRemove = orderedCombatants.value[index]
  const actualIndex = combatants.value.findIndex((c: Combatant) => c === combatantToRemove)

  if (actualIndex === -1) return // Safety check

  combatants.value.splice(actualIndex, 1)
  if (index < turn.value) {
    turn.value -= 1
  } else if (index == combatants.value.length) {
    nextTurn()
  }
}

/**
 * Reset combat to default state
 * Restores default combatants, resets turn to 0 and round to 1
 */
function resetToDefaults(): void {
  turn.value = 0
  round.value = 1
  combatants.value = getDefaultCombatants(gameSystem.value)
}

</script>

<template>
  <div v-if="!isInitialized" class="flex items-center justify-center min-h-screen">
    <div class="loading loading-spinner loading-lg"></div>
  </div>
  <DMView
      v-else-if="isDMView"
      :turn="turn"
      :round="round"
      :combatants="orderedCombatants"
      :isOnlineMode="isOnlineMode"
      :sessionId="sessionId"
      @nextTurn="nextTurn"
      @reset="reset"
      @resetToDefaults="resetToDefaults"
      @newCombatant="addCombatant"
      @removeCombatant="removeCombatant"
      @toggleOnlineMode="toggleOnlineMode"
  />
  <PlayerView
      v-else
      :turn="turn"
      :round="round"
      :combatants="orderedCombatants"
  />
</template>

<style scoped>

</style>
