# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 + TypeScript initiative tracker for tabletop RPG combat, specifically designed for Pathfinder 2e. The application manages combatant tracking with HP, initiative order, conditions, and provides separate views for DM and players.

## Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **TypeScript** (strict mode)
- **Vite** for build tooling
- **Tailwind CSS** (v4) with DaisyUI for styling
- **Reka UI** for advanced components (popovers, scroll areas, number fields)
- **VueUse** for localStorage persistence
- **Iconify** for icons

## Development Commands

```bash
# Development server
pnpm dev

# Type-check and build
pnpm build

# Preview production build
pnpm preview
```

## Build Configuration

- Build output directory is `./docs` (configured for GitHub Pages deployment)
- Uses vue-tsc for type checking before build

## Architecture

### State Management

State is managed using VueUse's `useStorage` composable for localStorage persistence across:
- `combatants`: Array of combatants with custom serialization
- `turn`: Current turn index
- `round`: Current round number
- `lang`: Selected language (en/pt_BR)
- `theme`: DaisyUI theme selection

### Core Data Models (src/functions.ts)

- **Combatant**: Main entity tracking name, HP (current/total), initiative, conditions, and visibility
- **Condition**: Represents status effects with name, value, and auto-generated color
- **Visibility**: Enum controlling player view visibility (None/Half/Full)

### Component Structure

- **App.vue**: Root component with theme/language selectors
- **InitiativeManager.vue**: State container that routes to DM or Player view based on URL param `?view=player`
- **DMView.vue**: DM interface with full controls
- **DMTable.vue**: DM combat table with HP/condition management
- **PlayerView.vue**: Read-only player interface
- **PlayerTable.vue**: Player-facing combat table

### Database Files (src/db.ts)

Contains large static arrays:
- Monster lists from Pathfinder 2e Monster Core and Age of Ashes
- Condition definitions in English and Portuguese (name + description)

### Internationalization (src/lang.ts)

Structured translation object supporting English and Brazilian Portuguese. All UI text should be added here with both language variants.

## Key Features

1. **Dual Views**: DM view with full controls vs player view (toggle via `?view=player` URL param)
2. **Visibility System**: Three-tier visibility (hidden, name-only, full HP) controlled per combatant
3. **Condition Tracking**: Auto-colored condition badges with value management
4. **HP Management**: Increment/decrement controls with configurable step value
5. **Turn Management**: Automatic turn advancement that respects visibility settings
6. **Theme System**: 35+ DaisyUI themes with live preview
7. **LocalStorage Persistence**: All combat state persists automatically

## Working with Combatants

When modifying combatant logic:
- Custom serialization is required due to class instances in localStorage (see InitiativeManager.vue:15-26)
- Initiative sorting uses initiative value first, then name for tiebreaking
- Turn advancement skips combatants with `Visibility.None`

## Styling Approach

- Use DaisyUI semantic classes (btn, card, table, etc.) for components
- Tailwind utility classes for layout
- Theme colors use DaisyUI CSS variables (e.g., `bg-base-100`, `text-primary-content`)