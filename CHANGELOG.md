# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Unit test suite with 20+ tests covering core functionality
- Comprehensive JSDoc documentation for all complex functions
- ARIA labels throughout the UI for better accessibility
- GitHub Actions CI/CD workflow
- GitHub issue and PR templates
- Code of Conduct (Contributor Covenant v2.1)
- Detailed contributing guidelines

### Changed
- TypeScript prop types now use primitives (`number`, `Combatant[]`) instead of wrappers
- Default combatants changed from personal campaign to iconic Pathfinder characters
- Portuguese translation now covers all UI elements including help text

### Fixed
- Removed debug console.log statements from production code

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release
- Combat initiative tracking with automatic sorting
- HP management with healing, damage, and temporary HP support
- Three-tier visibility system (Hidden/Half/Full)
- Condition tracking with auto-generated colors
- Dual view system (DM view with controls, Player view read-only)
- 35+ DaisyUI themes
- Bilingual support (English and Brazilian Portuguese)
- LocalStorage persistence for combat state
- Integrated Pathfinder 2e monster database (Monster Core + Age of Ashes)
- Official PF2e condition database with descriptions
- Bulk creature spawning with automatic color naming
- Responsive design for desktop and mobile
- Keyboard shortcuts and accessibility features
- Real-time synchronization between DM and player views

[Unreleased]: https://github.com/Valforte/iniciative-tracker/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Valforte/iniciative-tracker/releases/tag/v1.0.0
