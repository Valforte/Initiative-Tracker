# Online Mode - Quick Start

This guide will get you up and running with online multiplayer in 15 minutes.

## What You Need

1. A Google account (free)
2. 15 minutes of your time

## Setup Steps

### 1. Create Firebase Project (5 min)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it (e.g., "Initiative Tracker")
4. Disable Google Analytics
5. Click "Create project"

### 2. Enable Realtime Database (3 min)

1. In Firebase Console, click "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose your region (closest to your players)
4. Select "Start in test mode"
5. Click "Enable"

### 3. Configure Security Rules (2 min)

1. Go to "Rules" tab in Realtime Database
2. Paste this:

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

3. Click "Publish"

### 4. Get Your Config (2 min)

1. Click the gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps"
3. Click "</>" (Web icon)
4. Name it "Initiative Tracker Web"
5. Click "Register app"
6. **Copy the firebaseConfig object**

### 5. Configure the App (3 min)

1. Copy the template file:
   ```bash
   cp firebase.config.template.ts src/firebase.config.ts
   ```

2. Edit `src/firebase.config.ts` with your Firebase values

3. Build and deploy:
   ```bash
   pnpm build
   git add -A
   git commit -m "Enable online mode"
   git push
   ```

## Using It

### DM:
1. Open your initiative tracker
2. Toggle "Online Mode" to ON
3. Click "Copy Player URL"
4. Share the URL with your players

### Players:
1. Open the URL shared by DM
2. That's it! Updates happen in real-time

## Troubleshooting

**Can't toggle online mode?**
- Make sure `src/firebase.config.ts` exists with valid config

**Changes not syncing?**
- Check your internet connection
- Verify session ID is in the URL

**Build failing?**
- Make sure you ran `pnpm install` after pulling the code
- Check that Firebase dependency was installed

## Cost

Firebase free tier includes:
- 100 simultaneous connections
- 1 GB storage
- 10 GB/month data transfer

Perfect for gaming groups!

## Next Steps

See [ONLINE_MODE_SETUP.md](./ONLINE_MODE_SETUP.md) for:
- Detailed explanations
- Security considerations
- Advanced configuration
- Full troubleshooting guide
