# Git Workflow & GitHub Actions Explained

This document explains how your git branches and automated workflows are set up.

## Branch Strategy

Your repository uses a **two-branch strategy**:

```
main (development)
  ↓
  ↓ [when ready for production]
  ↓
prod (production/deployment)
```

### `main` branch
- **Purpose**: Active development
- **What happens here**:
  - Day-to-day coding
  - Feature development
  - Bug fixes
  - Pull requests from contributors
- **Automated checks**: CI runs tests, type-check, and build (but doesn't deploy)

### `prod` branch
- **Purpose**: Production releases
- **What happens here**:
  - Stable, tested code ready for users
  - Triggers automatic deployment to GitHub Pages
- **Automated checks**: CI + automatic deployment to live site

---

## GitHub Actions Workflows

You have **2 automated workflows** that run on GitHub's servers:

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers**: Runs on every push or pull request to `main` or `prod`

**What it does**:
```
Step 1: Checkout code
   ↓ Downloads your code from GitHub

Step 2: Setup Node.js 20
   ↓ Installs Node.js on the GitHub server

Step 3: Setup pnpm
   ↓ Installs pnpm package manager

Step 4: Install dependencies (pnpm install)
   ↓ Downloads all your project dependencies (Vue, TypeScript, etc.)

Step 5: Run tests (pnpm test)
   ↓ Executes your unit tests - FAILS if any test fails

Step 6: Type check (pnpm run type-check)
   ↓ Checks TypeScript types - FAILS if any type errors

Step 7: Build (pnpm build)
   ↓ Builds production version - FAILS if build errors

✅ If all steps pass → Green checkmark on GitHub
❌ If any step fails → Red X on GitHub (and PR can't be merged)
```

**Purpose**: Ensures code quality. Prevents broken code from being merged.

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers**: ONLY runs when you push to `prod` branch

**What it does**:
```
BUILD JOB:
Step 1: Checkout code
   ↓ Downloads your code from GitHub

Step 2: Setup Node.js 20
   ↓ Installs Node.js

Step 3: Setup pnpm
   ↓ Installs pnpm

Step 4: Install dependencies
   ↓ Downloads all dependencies

Step 5: Build for production (pnpm build)
   ↓ Creates optimized production build in ./docs folder

Step 6: Setup Pages
   ↓ Configures GitHub Pages settings

Step 7: Upload artifact
   ↓ Packages the ./docs folder for deployment
   ↓
   ↓ (waits for BUILD JOB to complete)
   ↓
DEPLOY JOB:
Step 8: Deploy to GitHub Pages
   ↓ Publishes the built files to your live site
   ↓
   🌐 Site is now live at: https://valforte.github.io/iniciative-tracker/
```

**Purpose**: Automatically deploys your site when you're ready to release.

---

## Typical Development Workflow

### Daily Development

```bash
# 1. Make sure you're on main branch
git checkout main

# 2. Create a new branch for your feature (optional but recommended)
git checkout -b feature/add-new-theme

# 3. Make your changes, write code, etc.
# ... edit files ...

# 4. Run tests locally before committing
pnpm test
pnpm run type-check

# 5. Commit your changes
git add .
git commit -m "feat: add dark forest theme"

# 6. Push to GitHub
git push origin feature/add-new-theme
# (or if working directly on main: git push origin main)

# 7. GitHub Actions will automatically:
#    - Run your tests
#    - Check types
#    - Try to build
#    - Show ✅ or ❌ on GitHub
```

**At this point**:
- Code is on GitHub
- Tests ran automatically
- But site is NOT deployed yet (still on old version)

### Deploying to Production

When you're ready to release to users:

```bash
# 1. Make sure main is stable and tests pass
git checkout main
git pull origin main  # Get latest changes

# 2. Merge main into prod
git checkout prod
git pull origin prod  # Get latest prod
git merge main        # Bring main's changes into prod

# 3. Push to prod
git push origin prod

# 4. GitHub Actions will automatically:
#    - Run CI tests (to double-check)
#    - Build the project
#    - Deploy to GitHub Pages
#    - Your live site updates in ~2 minutes!
```

---

## Understanding the Workflows Step-by-Step

### Why separate CI and Deploy?

**CI (Continuous Integration)**:
- Runs on EVERY change
- Fast feedback: "Did I break something?"
- Prevents bad code from being merged
- Doesn't affect live site

**Deploy (Continuous Deployment)**:
- Runs ONLY when you explicitly push to `prod`
- You control when users see changes
- Gives you time to test on `main` first

### What "build" does

When you run `pnpm build` (or GitHub Actions does):

```
Your source code (src/*.vue, src/*.ts)
   ↓
   ↓ [Vite processes]
   ↓
   ↓ - Compiles TypeScript → JavaScript
   ↓ - Bundles all files together
   ↓ - Minifies code (removes spaces, shortens names)
   ↓ - Optimizes images and assets
   ↓ - Applies Tailwind CSS
   ↓
Output: ./docs folder
   ├── index.html (entry point)
   ├── assets/
   │   ├── index-[hash].js (your code, bundled)
   │   └── index-[hash].css (your styles)
   └── [images/icons]
```

This `./docs` folder is what gets deployed to GitHub Pages.

### Why `./docs` is ignored in git

**Problem**: Build files are large, change constantly, and are auto-generated
**Solution**: Don't track them in git, generate them fresh each deployment

**Before** (old way - what you had):
- Every build creates new files
- Git shows tons of changes
- Repo gets bloated with old builds
- Merge conflicts on build files

**Now** (proper way):
- `docs/` is in `.gitignore`
- GitHub Actions builds fresh each time
- Git only tracks source code
- Cleaner history

---

## Common Scenarios

### "I want to test before deploying"

```bash
# Option 1: Test locally
pnpm build
pnpm preview  # Runs local server with production build

# Option 2: Push to main, check if CI passes, then merge to prod
git push origin main
# Wait for CI to pass (check GitHub)
# If green ✅, then merge to prod
```

### "I pushed to main and CI failed"

```bash
# 1. Check the error on GitHub
#    - Go to your repo → Actions tab → Click the failed run
#    - Read the error message

# 2. Fix locally
#    ... make fixes ...

# 3. Commit and push again
git add .
git commit -m "fix: resolve test failure"
git push origin main
```

### "I want to rollback the live site"

```bash
# 1. Go back to a previous commit on prod
git checkout prod
git reset --hard <commit-hash-of-good-version>
git push --force origin prod

# 2. GitHub Actions will redeploy the old version
```

### "How do I know if deployment worked?"

1. Go to your repo on GitHub
2. Click "Actions" tab at top
3. You'll see:
   - **CI workflow** (runs on main and prod)
   - **Deploy workflow** (runs only on prod)
4. Click the latest "Deploy to GitHub Pages" run
5. Watch the steps execute (takes ~2 min)
6. When complete, visit: https://valforte.github.io/iniciative-tracker/

---

## Diagram: Complete Flow

```
┌─────────────────────────────────────────────────────────┐
│  YOU (Local Computer)                                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Edit code in src/                                   │
│     ↓                                                    │
│  2. git commit -m "..."                                 │
│     ↓                                                    │
│  3. git push origin main                                │
│                                                          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│  GITHUB (Cloud)                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  4. Code arrives in main branch                         │
│     ↓                                                    │
│  5. ⚡ CI Workflow triggers automatically                │
│     ├─ Run tests                                        │
│     ├─ Check types                                      │
│     └─ Build                                            │
│     ↓                                                    │
│  6. ✅ All pass → Green checkmark                        │
│     ❌ Any fail → Red X (fix and push again)            │
│                                                          │
│  ⏸️  PAUSE: You decide when to deploy                   │
│                                                          │
│  7. When ready: git checkout prod                       │
│                 git merge main                          │
│                 git push origin prod                    │
│     ↓                                                    │
│  8. ⚡ Deploy Workflow triggers automatically            │
│     ├─ Build production bundle                          │
│     ├─ Package ./docs folder                           │
│     └─ Deploy to GitHub Pages                          │
│     ↓                                                    │
│  9. 🌐 Site updates at:                                 │
│     https://valforte.github.io/iniciative-tracker/      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## GitHub Pages Setup (One-time)

You need to configure GitHub Pages to use the Actions deployment:

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" (NOT "Deploy from a branch")
4. Save

That's it! Now the deploy workflow will handle everything.

---

## Quick Reference Commands

```bash
# Development (daily work)
git checkout main
git pull
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin main

# Deployment (when ready for users)
git checkout prod
git merge main
git push origin prod

# Check status
git status              # See what's changed locally
git log --oneline -5    # See recent commits
git branch -a           # See all branches

# If you need to switch branches
git checkout main       # Switch to main
git checkout prod       # Switch to prod
```

---

## Summary

**What you need to remember**:
1. **Work on `main`** - push whenever you want, CI checks quality
2. **Merge to `prod`** - only when ready to release, triggers deployment
3. **GitHub Actions** - robots that test and deploy for you automatically
4. **`./docs` folder** - ignored in git, built fresh each deployment

That's it! The robots (GitHub Actions) handle the testing and deployment for you. You just write code and decide when to release. 🤖

---

## Troubleshooting

**Q: CI is failing but it works locally?**
- Check Node.js version matches (20)
- Check if dependencies are in package.json
- Look at exact error in Actions tab

**Q: Deployment worked but site shows old version?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Wait 2-3 minutes for CDN to update

**Q: I don't see the deploy workflow running?**
- Check you pushed to `prod`, not `main`
- Check GitHub Pages is set to "GitHub Actions" source

**Q: Build works locally but fails in Actions?**
- Usually a missing dependency
- Check package.json has all deps
- Try deleting node_modules and pnpm-lock.yaml, then pnpm install

**Q: CI fails with "packages field missing or empty"?**
- You have a `pnpm-workspace.yaml` file you don't need
- This file is only for monorepos (multiple packages)
- Solution: Delete `pnpm-workspace.yaml`

---

Need help? Open an issue and show:
1. What you were trying to do
2. What command you ran
3. Link to failed Action run (if applicable)
