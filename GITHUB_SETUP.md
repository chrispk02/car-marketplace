# GitHub Setup for Production

## 🔧 Configure GitHub Repository

### 1. Copy Repository (if needed)

```bash
# Create new repo on GitHub
# https://github.com/new

# Initialize local repo if not done yet
cd d:\car-marketplace
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/car-marketplace.git
git push -u origin main
```

### 2. Enable Branch Protection

**Repository Settings → Branches → Add Rule:**

```
Branch name pattern: main

Rules:
✓ Require a pull request before merging
✓ Require status checks to pass before merging
✓ Require branches to be up to date before merging
✓ Include administrators
```

### 3. Add Secrets for CI/CD

**Settings → Secrets and variables → Actions:**

**For Vercel (Frontend):**
```
VERCEL_TOKEN
  → https://vercel.com/account/tokens
  → Create new token

VERCEL_ORG_ID
  → https://vercel.com/account -> Team ID in URL

VERCEL_PROJECT_ID
  → https://vercel.com/project → Settings → Project ID
```

**For Render (Backend):**
```
RENDER_API_KEY
  → https://dashboard.render.com → Account → API Tokens
  → Create new token

RENDER_SERVICE_ID
  → https://dashboard.render.com → Web Service → Settings
  → Copy from service URL or ID field
```

### 4. Enable GitHub Actions

**Actions tab → Setup workflows:**

Workflows are already created:
- `.github/workflows/deploy-frontend.yml`
- `.github/workflows/deploy-backend.yml`

Enable them:
```
- Click each workflow
- Click "Enable workflow"
```

---

## 🔄 How CI/CD Works

### Frontend Deployment Flow

```
1. Push to main branch
   ↓
2. GitHub Actions triggers
   ↓
3. checkout code
   ↓
4. Uses Vercel GitHub integration
   ↓
5. Vercel builds and deploys
   ↓
6. Live at https://your-project.vercel.app
```

### Backend Deployment Flow

```
1. Push to main branch
   ↓
2. GitHub Actions triggers
   ↓
3. Call Render API
   ↓
4. Render rebuilds
   → npm install
   → npm run build
   → npx prisma migrate deploy
   ↓
5. Live at https://your-service.render.com
```

---

## 📋 .gitignore Setup

Already configured in `.gitignore`:

```
# Don't commit these:
.env                    # Local development
.env.local             # Local overrides
.env.production.local  # Local production testing
.env.*.production      # Any production env files

# Build artifacts:
node_modules/
dist/

# OS files:
.DS_Store
Thumbs.db

# Logs
*.log
logs/
```

**Verify no secrets are committed:**

```bash
# Check what will be committed
git status

# Search for .env in history
git log -p -- .env

# If accidentally committed:
git rm --cached .env
git commit -m "Remove .env file"
git push
```

---

## 🔐 Manage Secrets Safely

### For Package.json Scripts

Never hardcode secrets! Use environment variables:

```bash
# ❌ WRONG
"start": "PORT=3000 API_KEY=secret npm start"

# ✅ CORRECT
# Put in .env file (not committed)
# Run: npm start
# Node automatically loads from .env
```

### For Database Connections

Use environment variables in code:

```typescript
// ✅ CORRECT
const dbUrl = process.env.DATABASE_URL
const connection = nodepg.connect(dbUrl)

// ❌ WRONG
const connection = nodepg.connect("postgresql://postgres:password@...")
```

---

## 🚀 Making Changes

### Standard Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to GitHub
git push origin feature/new-feature

# 4. Create Pull Request on GitHub
# - Compare: main ← feature/new-feature
# - Describe changes
# - Request reviewers
# - CI checks must pass

# 5. Merge to main
# Click "Squash and merge" or "Merge pull request"

# 6. Auto-deployment triggers
# - Frontend deploys to Vercel
# - Backend deploys to Render
```

---

## 📊 Monitor CI/CD

### GitHub Actions Dashboard

```
Repository → Actions tab
- View all workflows
- Check logs for failed jobs
- See deployment status
```

### Vercel Deployments

```
Dashboard → Deployments
- Each commit = new deployment
- View build logs
- Rollback if needed
```

### Render Deployments

```
Service Dashboard → Deploys tab
- Each push = new deploy
- View logs
- Manual redeploy option
```

---

## 🆘 Troubleshooting

### Workflow Not Running
```
Check:
1. GitHub Actions are enabled (Settings → Actions)
2. Permission to use secrets (Admin only)
3. Workflow file syntax is correct
4. Branch matches trigger (main)
```

### Deployment Failed
```
Check logs:
1. GitHub Actions: Actions tab → workflow → build logs
2. Vercel: Deployments → failed → View logs
3. Render: Deploys → failed → View logs
```

### Secrets Not Accessible
```
Issues:
- Private repos: Runner can't access private packages
- GitHub Token expired: Regenerate in Account Settings
- Wrong secret name: Double-check spelling

Fix:
- Use Personal Access Token (PAT)
- Ensure secret is in right repository
- Verify workflows can access secrets
```

---

## 🔍 Best Practices

1. **Branch Names**: Use descriptive names
   - ✅ `feature/user-authentication`
   - ✅ `fix/database-connection`
   - ❌ `changes` or `test`

2. **Commit Messages**: Clear and specific
   - ✅ "Fix CORS issue with frontend API calls"
   - ✅ "Add user email validation in signup"
   - ❌ "fix bug" or "update"

3. **Pull Requests**: Always use them
   - Easier to review changes
   - CI checks must pass
   - Team approval before merge

4. **Secrets Management**
   - Never log secrets
   - Rotate keys periodically
   - Use GitHub's secret scanning

---

## 📞 Helpful Links

- GitHub Docs: https://docs.github.com
- GitHub Actions: https://docs.github.com/en/actions
- Vercel GitHub Integration: https://vercel.com/docs/git/vercel-for-github
- Render GitHub Webhook: https://render.com/docs/deploy-from-github

---

*Created: 2026-03-24*
