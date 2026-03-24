# Production Deployment Guide - Car Marketplace

## 📋 Overview

Kiến trúc deployment:
- **Frontend**: Vercel (Automatic deployment từ GitHub)
- **Backend**: Render.com hoặc Railway (Recommend Render)
- **Database**: Supabase PostgreSQL
- **Git**: GitHub (Central repository)

---

## 🚀 Step-by-Step Deployment

### Phase 1: Setup Supabase Database

#### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create account hoặc login
4. Create new project:
   - Name: `car-marketplace`
   - Password: Lưu an toàn
   - Region: Gần nhất với location người dùng
5. Chờ project initialize (2-3 phút)

#### 2. Get Database Connection String
1. Dashboard → Settings → Database
2. Connection string section → Copy "URI"
3. Format: `postgresql://postgres.[PROJECT_ID]:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`

#### 3. Prepare Database
1. Go to SQL Editor
2. Create new query
3. Copy nội dung từ `Backend/prisma/schema.prisma`
4. Chạy migration:
```bash
cd Backend
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

---

### Phase 2: Deploy Backend to Render

#### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up với GitHub

#### 2. Create New Web Service
1. Dashboard → New → Web Service
2. Connect GitHub repository
3. Settings:
   - Name: `car-marketplace-api`
   - Environment: `Node`
   - Build Command: `npm install && npm run build && npx prisma migrate deploy`
   - Start Command: `npm start`
   - Region: Gần nhất

#### 3. Set Environment Variables
Dashboard → Environment → Add:
```
DATABASE_URL=postgresql://postgres.[PROJECT_ID]:PASSWORD@db.[PROJECT_REF].supabase.co:5432/postgres
JWT_SECRET=your-very-strong-random-secret-min-32-chars
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

#### 4. Deploy
- Render sẽ tự động deploy khi push code lên GitHub
- Watch deployment logs
- Get publicURL: `https://car-marketplace-api.render.com`

---

### Phase 3: Deploy Frontend to Vercel

#### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up với GitHub

#### 2. Import Project
1. Dashboard → Add New → Project
2. Select GitHub repository
3. Framework: `Vite`
4. Root Directory: `Frontend`

#### 3. Set Environment Variables
Project Settings → Environment Variables:
```
VITE_API_URL=https://car-marketplace-api.render.com
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_APP_ENV=production
```

#### 4. Deploy
- Click "Deploy"
- Vercel sẽ build và deploy tự động
- Get frontend URL từ deployment complete message

---

### Phase 4: GitHub & Continuous Deployment

#### 1. Update Backend .env.production
```bash
cd Backend
cp .env.production .env.production.local
# Điền đúng values (đừng commit)
```

#### 2. Setup GitHub Secrets
Repository Settings → Secrets and variables → Actions → New Repository Secret:

**Cho Backend (Render):**
- `RENDER_API_KEY` - Lấy từ Render Account Settings
- `RENDER_SERVICE_ID` - Lấy từ service URL

**Cho Frontend (Vercel):**
- `VERCEL_TOKEN` - Generate từ Vercel Account Settings → Tokens
- `VERCEL_ORG_ID` - Lấy từ Vercel Team ID
- `VERCEL_PROJECT_ID` - Lấy từ project settings

#### 3. Push to GitHub
```bash
cd d:\car-marketplace
git add .
git commit -m "Configure for production deployment"
git push origin main
```

#### 4. Verify Auto-Deployment
- GitHub Actions sẽ tự động trigger
- Watch workflow status → Actions tab
- Backend sẽ deploy tới Render
- Frontend sẽ deploy tới Vercel

---

## 🔧 Configuration Details

### Frontend (Vercel)

**File: `vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_GEMINI_API_KEY": "@vite_gemini_api_key"
  }
}
```

**Environment Variables (Vercel Dashboard):**
- `VITE_API_URL`: Backend API URL
- `VITE_GEMINI_API_KEY`: Google Gemini API key

### Backend (Render)

**Build Command:**
```bash
npm install && npm run build && npx prisma migrate deploy
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- All values từ `.env.production`
- Đặc biệt: `DATABASE_URL` từ Supabase

---

## 🔐 Security Best Practices

### 1. Environment Secrets
- ✅ Đừng commit `.env.production` files
- ✅ Sử dụng platform secrets (GitHub, Vercel, Render)
- ✅ Rotate JWT_SECRET monthly
- ✅ Enable branch protection rules

### 2. Database Security
- ✅ Supabase: Enable Row Level Security (RLS)
- ✅ Set strong database password
- ✅ Enable SSL connection
- ✅ Regular backups enabled

### 3. CORS Configuration
Backend `main.ts` đã có CORS setup từ `.env.FRONTEND_URL`

### 4. API Key Protection
- ✅ Keep Gemini API key secret
- ✅ AWS keys nếu sử dụng S3
- ✅ Rotate quarterly

---

## 📊 Monitoring & Logging

### Frontend (Vercel)
- Dashboard → Analytics: View performance metrics
- Logs → Deployments: Check build logs
- Logs → Edge Network: Check request logs

### Backend (Render)
- Dashboard → Logs: View application logs
- Metrics: CPU, memory, request count
- Uptime monitoring

### Database (Supabase)
- Dashboard → Database → Logs: Query logs
- Dashboard → Replication: Backup status
- Grafana dashboard: Performance metrics

---

## 🚨 Troubleshooting

### Frontend Build Fails
```bash
# Check locally first
cd Frontend
npm run build
npm run preview

# If fails, check:
# 1. Environment variables set correctly
# 2. VITE_API_URL is reachable
# 3. No TypeScript errors: npm run lint
```

### Backend Won't Start
```bash
# Check logs in Render dashboard
# Common issues:
# 1. DATABASE_URL wrong format
# 2. Prisma migration failed
# 3. PORT already in use

# Fix in Render:
# 1. Edit environment variables
# 2. Trigger manual deploy
```

### Database Connection Issues
```bash
# Test Supabase connection:
psql postgresql://postgres.xxxxx:PASSWORD@db.xxxxx.supabase.co:5432/postgres

# Check DATABASE_URL format:
# postgresql://[user]:[password]@[host]:[port]/[database]

# Verify:
# - User: postgres
# - Password: Correct
# - Host: db.xxxxx.supabase.co
# - Port: 5432
```

### CORS Errors
- Check Backend `FRONTEND_URL` environment variable
- Check if URL matches exactly (including protocol)
- Verify backend is running and responding

---

## 📈 Scaling Steps (Future)

When you need to scale:

1. **Database Replication** → Supabase → Settings → Replication
2. **Edge Caching** → Use Vercel edge middleware
3. **API Rate Limiting** → Add in Backend middleware
4. **CDN** → Enable in Vercel → Project Settings → Caching
5. **Auto-scaling** → Render Pro features

---

## 💰 Cost Estimate (Monthly)

- **Vercel**: Free tier (up to 100GB bandwidth)
- **Supabase**: Free tier (500MB database, 2GB bandwidth)
- **Render**: Free tier (monthly deploys only)

Upgrade when needed:
- Vercel Pro: $20/month
- Supabase Pro: $25/month  
- Render: Pay-as-you-go

---

## ✅ Deployment Checklist

Before going live:

### Code
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run build` - builds successfully
- [ ] Code review on GitHub
- [ ] All tests pass

### Database
- [ ] Supabase project created
- [ ] Database URL obtained
- [ ] Migrations run successfully
- [ ] Sample data created (optional)

### Backend
- [ ] Render account created
- [ ] Web service configured
- [ ] Environment variables set
- [ ] Database URL verified
- [ ] Manual deploy successful
- [ ] Health check endpoint responds

### Frontend
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables set
- [ ] Build successful
- [ ] Can access deployed URL

### DevOps
- [ ] GitHub secrets configured
- [ ] GitHub Actions workflows enabled
- [ ] Render webhook configured
- [ ] Vercel webhook configured
- [ ] domain/https configured

### Security
- [ ] .env.production in .gitignore
- [ ] No secrets in code
- [ ] CORS properly configured
- [ ] HTTPS enforced
- [ ] Database RLS enabled

### Documentation
- [ ] README updated with URLs
- [ ] Team notified of deployment
- [ ] Monitoring dashboard setup
- [ ] Incident response plan ready

---

## 📞 Support Links

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs/guides
- GitHub Actions: https://docs.github.com/en/actions
- Prisma Docs: https://www.prisma.io/docs

---

*Last Updated: 2026-03-24*
