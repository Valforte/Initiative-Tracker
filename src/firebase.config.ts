/**
 * Firebase Configuration
 *
 * Uses Vite environment variables for security.
 *
 * For local development:
 * - Create a .env file in the project root (see .env.example)
 *
 * For GitHub Pages deployment:
 * - Set these as GitHub Secrets in your repository
 * - GitHub Actions will inject them during build
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
