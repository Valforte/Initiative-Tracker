# Contributing to Pathfinder 2e Initiative Tracker

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:
- Be respectful and constructive in discussions
- Welcome newcomers and help them get started
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/iniciative-tracker.git
   cd iniciative-tracker
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Valforte/iniciative-tracker.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Start the development server**:
   ```bash
   pnpm dev
   ```

6. **Open the app** at `http://localhost:5173`

## Development Workflow

### Before You Start
1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for significant changes to discuss the approach first
3. **Keep changes focused** - one feature/fix per PR

### Making Changes

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following the coding standards below

3. **Test your changes** thoroughly:
   - Test in both DM and Player views
   - Test with different visibility settings
   - Test HP management (damage, healing, temp HP)
   - Test condition management
   - Test in multiple themes
   - Test in both languages (EN/PT-BR)

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve bug description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### TypeScript/Vue
- Use TypeScript for all new code
- Follow Vue 3 Composition API with `<script setup>`
- Use strict type checking
- Prefer `const` over `let`, avoid `var`
- Use descriptive variable and function names

### Component Structure
```vue
<script setup lang="ts">
// 1. Imports (Vue, libraries, local)
// 2. Props and emits definitions
// 3. Composables
// 4. Reactive state
// 5. Computed properties
// 6. Functions
// 7. Lifecycle hooks
</script>

<template>
  <!-- Template here -->
</template>

<style scoped>
  /* Styles here (prefer Tailwind classes) */
</style>
```

### Styling
- Use Tailwind CSS utility classes
- Use DaisyUI semantic classes for components
- Keep custom CSS minimal
- Ensure all themes work correctly

### Localization
- **All user-facing text must be localized**
- Add translations to `src/lang.ts` for both EN and PT-BR
- Use the `useTranslations()` composable
- Format: `{{ t.section.key }}`

Example:
```typescript
// In lang.ts
export const translations = {
  en: {
    mySection: {
      myText: "Hello World"
    }
  },
  pt_BR: {
    mySection: {
      myText: "Olá Mundo"
    }
  }
}

// In component
const { t } = useTranslations()
// Use: {{ t.mySection.myText }}
```

### Code Quality
- Remove `console.log()` statements before committing
- Avoid commented-out code
- Write clear comments for complex logic
- Keep functions small and focused
- Avoid deep nesting

## Submitting Changes

### Pull Request Process

1. **Update your branch** with latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure your PR**:
   - Has a clear title and description
   - References any related issues (e.g., "Fixes #123")
   - Includes only relevant changes
   - Builds successfully (`pnpm build`)
   - Works in both DM and Player views
   - Maintains localization in both languages

3. **PR Description Template**:
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested in DM view
   - [ ] Tested in Player view
   - [ ] Tested with different visibility settings
   - [ ] Tested in both languages
   - [ ] Tested in multiple themes

   ## Screenshots (if applicable)
   Add screenshots or GIFs showing the changes

   ## Related Issues
   Fixes #(issue number)
   ```

4. **Respond to feedback** promptly and make requested changes

5. **Squash commits** if requested to maintain a clean history

## Reporting Bugs

### Before Reporting
- Check if the bug has already been reported
- Try to reproduce in the latest version
- Test in different browsers if applicable

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Language: [EN/PT-BR]
- Theme: [if relevant]

**Additional context**
Any other relevant information
```

## Requesting Features

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem

**Describe the solution you'd like**
A clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions or features you've considered

**Additional context**
Mockups, examples, or other relevant information
```

## Development Tips

### Testing Player View
```bash
# In browser, add query param:
http://localhost:5173/?view=player
```

### localStorage Debugging
```javascript
// In browser console:
localStorage.clear() // Reset all data
console.log(localStorage) // View stored data
```

### Adding New Monsters/Conditions
- Monsters: Add to `src/db.ts` in appropriate array
- Conditions: Add to both EN and PT-BR sections in `src/db.ts`

### Component Architecture
```
App.vue (theme/language controls)
  └─ InitiativeManager.vue (state management)
      ├─ DMView.vue (DM interface)
      │   └─ DMTable.vue (combat table with controls)
      └─ PlayerView.vue (player interface)
          └─ PlayerTable.vue (read-only combat table)
```

## Questions?

If you have questions:
- Check the [README.md](README.md) for documentation
- Look at existing code for examples
- Open an issue for discussion
- Review closed issues/PRs for similar topics

## Thank You!

Your contributions help make this tool better for the entire Pathfinder community. Every bug report, feature request, and pull request is appreciated!

---

Happy coding, and may your rolls be high!
