# Security Features

This document explains the security measures implemented in the online multiplayer mode.

## Player Security

### 1. Session-Based Access Control

**Problem**: Players could manipulate the URL to access DM view and see hidden combatants or modify combat data.

**Solution**:
- Each online session is tracked using a security token in the DM's localStorage (`dmSessions` array)
- When a session is created by the DM, it's registered as a "DM session"
- Player links (with `?session=xxx&view=player`) are identified as shared links
- If a session ID exists but is NOT in the DM's `dmSessions` list, the user is forced into read-only player view

### 2. URL Manipulation Protection

**Problem**: Players could remove the `?view=player` parameter to attempt accessing DM view.

**Solution**:
- A Vue watcher monitors the URL for changes
- If the session is identified as a player link and `view=player` is removed, the app automatically redirects back with the parameter
- This happens on every URL change, preventing manual manipulation

### 3. LocalStorage Isolation

**Problem**: Combat data stored in localStorage could be accessed by players via browser DevTools.

**Solution**:
- **Players**: When viewing a shared session, data is loaded from Firebase only (not from localStorage)
  - Their own localStorage is preserved (they may be DMs of other sessions)
  - They can't access the shared session's data locally
- **DM**: Combat data is backed up to localStorage for offline recovery
- Players viewing shared links don't write to localStorage for that session
- This prevents players from:
  - Seeing hidden combatant data through localStorage
  - Accessing HP values of visibility=half combatants locally
  - Having persistent access to session data after closing

## DM Benefits

### 1. Offline Backup

Even when using online mode, the DM's data is continuously synced to localStorage. This means:
- If Firebase goes down, the DM still has all data locally
- The DM can toggle online mode off and continue with the same combat state
- Data persists across page refreshes

### 2. Session Management

The DM can:
- Create multiple online sessions (each gets a unique ID)
- Switch between online and offline mode at will
- Keep track of which sessions they've created via the `dmSessions` list

## How It Works

### Creating an Online Session (DM)

1. DM toggles "Online Mode" to ON
2. App generates a unique session ID (e.g., `abc12345`)
3. Session ID is registered in localStorage: `dmSessions = ['abc12345']`
4. URL updates to: `?session=abc12345`
5. Data syncs to Firebase and localStorage simultaneously

### Joining as Player

1. Player opens shared URL: `?session=abc12345&view=player`
2. App checks: Is `abc12345` in this browser's `dmSessions`? NO
3. App identifies this as a shared player link
4. Data loads from Firebase only (read-only)
5. Any existing localStorage combat data is cleared
6. URL watcher prevents removing `view=player` parameter

### Security Flow

```
Player opens: ?session=abc123&view=player
    ↓
Check: Is 'abc123' in localStorage.dmSessions?
    ↓
NO → Force Player View (Read-Only)
    ↓
Load data from Firebase only (don't use/write localStorage)
    ↓
Watch URL: Keep view=player parameter
```

```
DM opens: ?session=abc123
    ↓
Check: Is 'abc123' in localStorage.dmSessions?
    ↓
YES → Allow DM View (Full Control)
    ↓
Load data from Firebase
    ↓
Sync changes to both Firebase AND localStorage
```

## Limitations

### 1. Browser-Specific

The security token (`dmSessions`) is stored in localStorage, which is browser-specific:
- A DM who creates a session in Chrome can't access it as DM in Firefox
- This is intentional and prevents accidental DM access from player devices

### 2. Shared Device Access

If a DM and player use the same browser on the same device:
- The player could theoretically become a DM for sessions they've accessed
- **Mitigation**: This is an edge case. In normal use, DMs and players use separate devices

### 3. Firebase Rules

Current Firebase rules allow anyone with a session ID to read/write:
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

**For production**: Consider implementing Firebase Authentication for stronger security, with rules like:
- Only authenticated users can create sessions
- Players can only read (not write)
- Sessions expire after X hours

## Testing Security

### Test 1: Player Cannot Access DM View

1. Create online session as DM
2. Copy player URL: `?session=xxx&view=player`
3. Open in incognito window
4. Try removing `?view=player` from URL
5. ✅ Should automatically redirect back with `?view=player`

### Test 2: Player Data Isolation

1. Open player link
2. Make changes in the DM view
3. Open DevTools → Application → Local Storage in player view
4. Check for `turn`, `round`, `combatants` keys
5. ✅ Player's localStorage should NOT update with the shared session data
6. ✅ Player can still have their own DM sessions in localStorage

### Test 3: DM Data Backup

1. Create online session as DM
2. Add some combatants
3. Open DevTools → Application → Local Storage
4. Check for `turn`, `round`, `combatants` keys
5. ✅ Should contain current combat data

### Test 4: Session Persistence

1. Create online session as DM
2. Close and reopen same URL (without `?view=player`)
3. ✅ Should still be in DM view with full access

## Best Practices

1. **Use separate devices**: Have players access the tracker from their own devices
2. **Use incognito for testing**: Test player view in incognito to avoid cross-contamination
3. **Don't share your DM URL**: Only share URLs with `?view=player` parameter
4. **Clear old sessions**: Periodically clear the `dmSessions` list in localStorage if you create many test sessions

## Future Enhancements

Potential improvements for even stronger security:

1. **Firebase Authentication**: Require login for DMs
2. **Read-only Firebase rules**: Players can only read data
3. **Session expiration**: Auto-delete sessions after 24 hours
4. **Session passwords**: Add optional password protection for sessions
5. **Activity logging**: Track who accessed which sessions
