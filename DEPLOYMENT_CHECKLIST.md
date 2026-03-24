# 🚀 Production Deployment Checklist

## ✅ Before You Start

### 1. Setup Accounts (5 minutes)
- [ ] Create [GitHub](https://github.com) account
- [ ] Create [Vercel](https://vercel.com) account (sign in with GitHub)
- [ ] Create [Render](https://render.com) account (sign in with GitHub)
- [ ] Create [Supabase](https://supabase.com) account

### 2. Prepare Repository
- [ ] Fork or create new repository on GitHub
- [ ] Clone locally: `git clone https://github.com/username/car-marketplace.git`
- [ ] Branch: `git checkout -b production-setup`

---

## 🗄️ Phase 1: Database Setup (10 minutes)

### Supabase Configuration
- [ ] Read: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- [ ] Create Supabase project
- [ ] Get DATABASE_URL connection string
- [ ] Save password securely (never share!)
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Verify schema created: `npx prisma db pull`

### Environment Files
- [ ] Create `.env.production` in Backend folder
- [ ] Add DATABASE_URL from Supabase
- [ ] Add JWT_SECRET (use: `openssl rand -base64 32`)
- [ ] **DO NOT COMMIT** `.env.production` file

---

## 🎨 Phase 2: Frontend Deployment (15 minutes)

### Vercel Setup
- [ ] Read: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Select GitHub repository
- [ ] Set Root Directory: `Frontend`
- [ ] Framework: `Vite`

### Add Environment Variables (Vercel Dashboard)
- [ ] `VITE_API_URL` = (leave for now, will get after backend deploy)
- [ ] `VITE_GEMINI_API_KEY` = (your API key)
- [ ] `VITE_APP_ENV` = `production`

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Verify: `https://your-project.vercel.app`
- [ ] Copy the URL for backend FRONTEND_URL

---

## 🔗 Phase 3: Backend Deployment (15 minutes)

### Render Setup
- [ ] Read: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- [ ] Go to [render.com](https://render.com)
- [ ] Click "New" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Settings:
  - [ ] Name: `car-marketplace-api`
  - [ ] Root Directory: `Backend`
  - [ ] Build Command: `npm install && npm run build && npx prisma migrate deploy`
  - [ ] Start Command: `npm start`

### Add Environment Variables (Render Dashboard)
- [ ] `DATABASE_URL` = PostgreSQL URL from Supabase
- [ ] `JWT_SECRET` = Strong random secret (min 32 chars)
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3001`
- [ ] `FRONTEND_URL` = Your Vercel URL from Phase 2
- [ ] `AWS_REGION` = `us-east-1` (or your region)

### Deploy
- [ ] Click "Create Web Service"
- [ ] Watch logs for successful deployment
- [ ] Verify service is "Live"
- [ ] Copy service URL for Vercel update

---

## 🔄 Phase 4: Connect Frontend to Backend (5 minutes)

### Update Vercel Environment
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Select project
- [ ] Settings → Environment Variables
- [ ] Update `VITE_API_URL` = Your Render service URL
- [ ] Settings → Deployments → Redeploy Latest
- [ ] Wait for deployment
- [ ] Verify API calls work in browser console

---

## 🤖 Phase 5: GitHub CI/CD Setup (10 minutes)

### GitHub Secrets Configuration
- [ ] Read: [GITHUB_SETUP.md](GITHUB_SETUP.md)
- [ ] Go to repository Settings → Secrets and variables → Actions

#### Vercel Secrets
- [ ] `VERCEL_TOKEN`:
  - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
  - Create Personal Access Token
  - Copy and add to GitHub
  
- [ ] `VERCEL_ORG_ID`:
  - From [vercel.com/account](https://vercel.com/account)
  - Look for Team ID in URL
  
- [ ] `VERCEL_PROJECT_ID`:
  - From Vercel project settings
  - Copy ID from page

#### Render Secrets
- [ ] `RENDER_API_KEY`:
  - Go to [render.com/account/api-tokens](https://render.com/account/api-tokens)
  - Create new token
  - Copy to GitHub
  
- [ ] `RENDER_SERVICE_ID`:
  - From service URL or settings page
  - Example: `srv_xxxxxxxxxxxxx`

### Enable Workflows
- [ ] Repository → Actions tab
- [ ] Enable workflows: Deploy Frontend and Deploy Backend

---

## 🧪 Phase 6: Test Everything (10 minutes)

### Local Testing
- [ ] Frontend: `cd Frontend && npm run build`
  - Should complete without errors
  
- [ ] Backend: `cd Backend && npm run build`
  - Should complete without errors

### Manual Test Deployments
- [ ] Make small change to Frontend
- [ ] Commit and push to main
- [ ] Watch GitHub Actions → Actions tab
- [ ] Verify Vercel deployment completes
- [ ] Verify frontend updates at vercel URL

- [ ] Make small change to Backend
- [ ] Commit and push to main
- [ ] Watch GitHub Actions → Actions tab
- [ ] Verify Render deployment completes
- [ ] Check Render logs for successful migration

### API Testing
- [ ] Verify backend health: `curl https://your-api.render.com/health`
- [ ] Get frontend: Visit `https://your-app.vercel.app`
- [ ] Check browser console for any errors
- [ ] Test signup/login flow

---

## 🔐 Phase 7: Security Hardening (10 minutes)

### Code Repository
- [ ] Check: `.env` files NOT in git history
  ```bash
  git log -p -- .env | head
  ```
- [ ] Add branch protection:
  - Settings → Branches → Add Rule
  - Branch: `main`
  - ✓ Require status checks before merging
  - ✓ Require branch to be up to date
  - ✓ Include administrators

### Secrets Management
- [ ] Rotate JWT_SECRET monthly
- [ ] Never share secrets in messages
- [ ] Review GitHub Actions secrets monthly
- [ ] Supabase: Enable RLS on database tables

### HTTPS & Domains
- [ ] Verify HTTPS on Vercel URL ✓
- [ ] Verify HTTPS on Render URL ✓
- [ ] (Optional) Add custom domain to Vercel

---

## 📊 Phase 8: Monitoring Setup (5 minutes)

### Dashboard Configuration
- [ ] Vercel Dashboard → Analytics
  - Enable analytics
  - Check performance metrics
  
- [ ] Render Dashboard → Metrics
  - Monitor CPU/Memory
  - Check error rates
  
- [ ] Supabase Dashboard
  - Check database load
  - Review backup status

### Logging
- [ ] GitHub Actions → Logs
  - Save workflow IDs for reference
  
- [ ] Vercel Logs
  - Check Edge Network logs
  - Monitor Function logs (if using)
  
- [ ] Render Logs
  - Check application logs daily initially
  - Set up log alerts (optional)

---

## 📝 Phase 9: Documentation & Handover (10 minutes)

### Update Documentation
- [ ] Update all URLs in documentation
  - [ ] Frontend URL in README
  - [ ] Backend URL in README
  - [ ] API documentation updated
  
- [ ] Create runbook for team:
  - [ ] How to deploy manually (if needed)
  - [ ] How to rollback (Vercel/Render)
  - [ ] How to scale (future)
  - [ ] Contact info for incidents

### Team Communication
- [ ] Notify team of live URLs
- [ ] Share database access (if needed)
- [ ] Provide credentials in secure method (1Password, etc)
- [ ] Create issue for monitoring setup

---

## ✨ Phase 10: Post-Launch (Ongoing)

### Week 1
- [ ] Monitor deployment logs daily
- [ ] Check error tracking
- [ ] Verify database backups
- [ ] Test all main features
- [ ] Get user feedback

### Month 1
- [ ] Review performance metrics
- [ ] Optimize slow queries
- [ ] Plan scaling (if needed)
- [ ] Rotate secrets
- [ ] Update dependencies

### Every Month
- [ ] Security audit
- [ ] Dependency updates
- [ ] Database maintenance
- [ ] Backup verification
- [ ] Performance review

---

## 🚨 Troubleshooting Quicklinks

### Common Issues

**Frontend won't load**
- Check VITE_API_URL in Vercel env vars
- Check browser console for errors
- Verify API is running on Render

**API returning errors**
- Check Render logs for stack traces
- Verify DATABASE_URL format
- Test database connection locally

**Database connection fails**
- Verify DATABASE_URL is from Supabase
- Check password is correct
- Confirm IP whitelist (usually not needed for Supabase)

**GitHub Actions fails**
- Check secret names are correct
- Verify tokens haven't expired
- Check workflow file syntax

---

## 📞 Getting Help

If stuck at any phase:

1. **Check Detailed Guides**
   - [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete reference
   - [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database issues
   - [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Frontend issues
   - [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Backend issues
   - [GITHUB_SETUP.md](GITHUB_SETUP.md) - CI/CD issues

2. **Check Documentation**
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
   - Official service docs (links in guides)

3. **Search Error Messages**
   - Google the exact error
   - Check service status pages
   - Review logs in dashboards

---

## ⏱️ Estimated Total Time

- Accounts & Setup: 5 min
- Supabase: 10 min
- Vercel: 15 min
- Render: 15 min  
- Connect: 5 min
- GitHub: 10 min
- Testing: 10 min
- Security: 10 min
- Monitoring: 5 min
- Documentation: 10 min

**Total: ~95 minutes (1.5 hours)**

---

*Save this checklist and check items off as you complete each phase.*
*Current Date: 2026-03-24*
