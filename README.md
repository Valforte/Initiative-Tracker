# 🎲 Pathfinder 2e Initiative Tracker

A modern, themeable initiative tracker for Pathfinder 2e combat encounters with separate DM and player views. Built with Vue 3, TypeScript, and Tailwind CSS.

**[🎮 Live Demo](https://valforte.github.io/iniciative-tracker/)**

## Features

### Core Functionality
- ⚔️ **Combat Management**: Track initiative order, HP (including temporary HP), and turn progression
- 👁️ **Three-Tier Visibility System**: Control what players see (hidden/name-only/full HP visibility)
- 🎯 **Condition Tracking**: Add, modify, and remove conditions with auto-generated color-coding
- 🔄 **Dual View System**: Separate interfaces for DM (full control) and players (read-only)
- 💾 **Auto-Save**: All combat state persists automatically to localStorage

### Customization
- 🎨 **35+ Themes**: Choose from a wide variety of DaisyUI themes with live preview
- 🌍 **Bilingual**: Full support for English and Brazilian Portuguese
- 📱 **Responsive Design**: Works on desktop and mobile devices

### DM Features
- Add/remove combatants with customizable visibility
- Modify HP with configurable increment values
- Manage temporary HP separately from regular HP
- Bulk spawn multiple creatures with auto-colored names
- Add and track conditions with values (e.g., "Frightened 2")
- Integrated monster list from Pathfinder 2e Monster Core and Age of Ashes
- Quick reference help tooltips for all major features

### Player Features
- Clean, distraction-free view of combat
- See only combatants the DM has made visible
- View HP bars and conditions (respecting visibility settings)
- Click conditions to see descriptions (when available)
- Real-time updates via localStorage synchronization

## Technology Stack

- **Vue 3** with `<script setup>` SFCs
- **TypeScript** (strict mode)
- **Vite** for build tooling
- **Tailwind CSS v4** with DaisyUI for styling
- **Reka UI** for advanced components
- **VueUse** for localStorage persistence
- **Iconify** for icons

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Setup

```bash
# Clone the repository
git clone https://github.com/Valforte/iniciative-tracker.git
cd iniciative-tracker

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Type-check and build
pnpm build

# Preview production build
pnpm preview
```

Build output is generated in the `./docs` directory (configured for GitHub Pages deployment).

## Usage

### DM View (Default)
When you open the app normally, you'll see the DM interface with full controls:

1. **Add Combatants**: Click the "Add" button to create new combatants
   - Enter name, HP, and initiative
   - Set visibility level (eye icons)
   - Use quantity field to spawn multiple creatures at once
   - Autocomplete suggestions from Monster Core database

2. **Manage HP**:
   - Set the increment value in the HP column header
   - Click minus (-) to damage, plus (+) to heal
   - Blue plus (+) adds temporary HP
   - Click the HP display button to heal to max
   - Right-click HP display to set max HP to the configured value

3. **Track Conditions**:
   - Click plus (+) to add a new condition
   - Click minus (-) to reduce all conditions by 1
   - Click a condition badge to reduce it by 1
   - Right-click a condition to increase it by 1
   - Autocomplete from official Pathfinder 2e conditions

4. **Control Visibility**:
   - 👁️ Full: Players see everything including HP bar
   - 👁️‍🗨️ Half: Players see name and initiative, but not HP
   - 🚫 Hidden: Combatant is hidden from players and skipped in turn order

5. **Advance Combat**:
   - Click "Next" to advance to the next turn
   - Click "New Combat" to reset round and turn counters

### Player View
To display the player view, add `?view=player` to the URL:
```
http://localhost:5173/?view=player
```

Players will see:
- Initiative order
- Combatant names (respecting visibility)
- HP bars (only for Full visibility combatants)
- Conditions with descriptions
- Current turn highlighted
- No controls or hidden information

**Tip**: Open the player view on a separate screen or device. Both views share the same localStorage, so changes update in real-time.

### Multi-Table Setup
If you need to run multiple tables simultaneously:
- Use different browsers or incognito windows (localStorage is per-origin)
- Or deploy multiple instances with different base URLs

## Pathfinder 2e Integration

This tracker is specifically designed for [Pathfinder 2e](https://paizo.com/pathfinder) by Paizo Inc. It includes:
- Pre-loaded monster database from Monster Core and Age of Ashes AP
- Official condition names and descriptions in English and Portuguese
- Temporary HP tracking (common in PF2e)
- Multi-stage conditions (e.g., Dying 1, 2, 3)

While built for PF2e, the tracker can be adapted for any d20 system or tabletop RPG.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vue 3](https://vuejs.org/), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/)
- Icons by [Iconify](https://iconify.design/)
- Monster data from Pathfinder 2e Monster Core and Age of Ashes Adventure Path
- Inspired by the need for a clean, modern initiative tracker for online and in-person play

## Support

If you encounter any issues or have suggestions:
- Open an issue on [GitHub Issues](https://github.com/Valforte/iniciative-tracker/issues)
- Check existing issues to avoid duplicates
- Provide as much detail as possible (browser, steps to reproduce, screenshots)

---

Made with ❤️ for the Pathfinder community
