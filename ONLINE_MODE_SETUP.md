# Online Mode Setup Guide

This guide will help you set up Firebase Realtime Database to enable online multiplayer functionality, allowing DMs to share combat sessions with players in real-time.

## Overview

The initiative tracker has two modes:

- **Offline Mode (Default)**: All data stored locally in browser localStorage. Works completely offline.
- **Online Mode**: Uses Firebase Realtime Database to sync combat state between DM and players in real-time.

## Prerequisites

- A Google account (free)
- About 10-15 minutes for setup

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "Initiative Tracker")
4. Disable Google Analytics (not needed for this project)
5. Click **"Create project"**

## Step 2: Set Up Realtime Database

1. In your Firebase project, click **"Build"** in the left sidebar
2. Click **"Realtime Database"**
3. Click **"Create Database"**
4. Choose a database location (pick the one closest to your players)
5. **Important**: Select **"Start in test mode"** for security rules
6. Click **"Enable"**

## Step 3: Configure Security Rules

1. In Realtime Database, go to the **"Rules"** tab
2. Replace the default rules with:

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

3. Click **"Publish"**

**Security Note**: These rules allow anyone with a session ID to read/write that session. This is suitable for private game sessions but not production apps. For better security, consider implementing Firebase Authentication.

## Step 4: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"**
4. Click the **"</>"** (Web) icon to add a web app
5. Give it a nickname (e.g., "Initiative Tracker Web")
6. **Don't** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object shown

It will look something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## Step 5A: Local Development Setup

For local development, create a `.env` file in the project root:

1. Copy the `.env.example` file:

```bash
cp .env.example .env
```

2. Open `.env` in your editor
3. Replace all the placeholder values with your Firebase config values from Step 4:

```env
VITE_FIREBASE_API_KEY=AIzaSyA...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

4. Save the file

**Important**: The `.env` file is gitignored to protect your credentials. Don't commit it to version control.

## Step 5B: GitHub Pages Setup (Production)

For GitHub Pages deployment, add your Firebase credentials as GitHub Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add each of these secrets:

   | Secret Name | Value from Firebase |
   |-------------|---------------------|
   | `VITE_FIREBASE_API_KEY` | Your `apiKey` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Your `authDomain` |
   | `VITE_FIREBASE_DATABASE_URL` | Your `databaseURL` |
   | `VITE_FIREBASE_PROJECT_ID` | Your `projectId` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Your `storageBucket` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your `messagingSenderId` |
   | `VITE_FIREBASE_APP_ID` | Your `appId` |

4. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically inject these secrets during the build process

## Step 6: Build and Deploy

### Local Testing

1. Build your project:

```bash
pnpm build
```

2. Preview the production build:

```bash
pnpm preview
```

3. The app will automatically detect the Firebase configuration and enable online mode

### GitHub Pages Deployment

1. Push your changes to the `prod` branch:

```bash
git push origin prod
```

2. GitHub Actions will automatically build and deploy
3. The deployed app at `https://yourusername.github.io/your-repo/` will have online mode enabled

## Using Online Mode

### For the DM:

1. Open the initiative tracker
2. Toggle **"Online Mode"** to ON
3. The page will reload with a session ID in the URL (e.g., `?session=abc12345`)
4. Click **"Copy Player URL"** to copy the player view link
5. Share this URL with your players via Discord, Slack, or your preferred platform

### For Players:

1. Open the URL shared by the DM
2. View updates in real-time as the DM manages combat
3. No setup required on the player side

## Features

- **Real-time sync**: All changes are instantly visible to all connected users
- **Automatic reconnection**: If connection drops, it automatically reconnects
- **Offline-first**: Can still use the app offline with localStorage
- **Session-based**: Each combat gets a unique URL, no accounts needed

## Troubleshooting

### "Firebase not initialized" error

- Make sure `src/firebase.config.ts` exists with valid credentials
- Check browser console for detailed error messages
- Verify your Firebase Realtime Database is enabled

### Changes not syncing

- Check your internet connection
- Verify the session ID is in the URL for both DM and players
- Check Firebase Console → Realtime Database to see if data is being written

### Permission denied errors

- Verify your Firebase security rules are set correctly (see Step 3)
- Make sure your Realtime Database is not in "Locked mode"

## Cost

Firebase has a generous free tier (Spark plan):

- **Simultaneous connections**: 100
- **Storage**: 1 GB
- **Data transfer**: 10 GB/month

For typical tabletop gaming use (1 DM + 3-6 players per session), the free tier should be more than sufficient.

## Security Considerations

The current setup uses simple session-based access without authentication. This is suitable for private gaming sessions but has limitations:

- Anyone with a session URL can view and modify that session
- No ability to "lock" or "close" a session
- No user management or permissions

For enhanced security, consider:

1. Implementing Firebase Authentication
2. Adding read-only rules for player URLs
3. Session expiration/cleanup
4. DM-only write permissions

## Switching Between Modes

You can freely switch between offline and online modes:

- **Offline → Online**: Your localStorage data stays local. New combats created online will sync.
- **Online → Offline**: Disconnect from Firebase and return to localStorage only.
- **Data is separate**: Offline and online sessions use different storage, they don't interfere with each other.

## Questions?

If you encounter issues not covered here, please open an issue on the GitHub repository.
