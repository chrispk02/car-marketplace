# Render Backend Deployment Guide

## 🚀 Deploy Backend to Render

### 1. Create Render Account

```
Go to https://render.com
Sign up with GitHub (recommended)
```

### 2. Create New Web Service

```
Dashboard → New → Web Service
Menu → Select GitHub repository
Branch: main
Environment: Node
```

### 3. Configure Service

```
Name: car-marketplace-api
Build Command: npm install && npm run build && npx prisma migrate deploy
Start Command: npm start
Region: Singapore (or nearest to users)

Plan: Free (Upgrade to $7/month for production)
```

### 4. Add Environment Variables

**Environment Tab → Add:**

```
DATABASE_URL = postgresql://postgres.[PROJECT_ID]:PASSWORD@db.[PROJECT_ID].supabase.co:5432/postgres
JWT_SECRET = your-super-strong-secret-key-min-32-chars
NODE_ENV = production
PORT = 3001
FRONTEND_URL = https://your-frontend.vercel.app
AWS_REGION = us-east-1
AWS_ACCESS_KEY_ID = (if using S3)
AWS_SECRET_ACCESS_KEY = (if using S3)
AWS_S3_BUCKET = (if using S3)
```

### 5. Deploy

```
Click "Create Web Service"
Watch deploy logs in Dashboard
Service will be available at: https://your-service.render.com

Get this URL → Add to Frontend VITE_API_URL
```

---

## 🔄 Automatic Deployments

Each push to GitHub:
1. Render receives webhook
2. Pulls latest code
3. Runs build command
4. Runs migrations
5. Starts service

**No manual deployment needed!**

---

## 📊 Monitoring

### Logs
```
Service Dashboard → Logs tab
View real-time application logs
```

### Metrics
```
Service Dashboard → Metrics tab
- CPU usage
- Memory usage
- Request count
- Status codes
```

### Uptime
```
Shows uptime percentage
Currently: 99.9% for most services
```

---

## 🔐 Security

### Database Security
- Supabase handles security
- Render service isolated
- HTTPS enforced

### Environment Variables
- Never commit to GitHub
- Use Render dashboard
- Auto-injected at runtime

### Health Checks
Render automatically checks health:
```
GET http://your-service.render.com/health
Should return 200 OK
```

---

## 🆘 Troubleshooting

### Build Fails
```
Check Logs tab:
1. npm dependencies issue?
   → Check package.json lock files
   
2. Build command failed?
   → Test locally: npm run build
   
3. Prisma migration failed?
   → DATABASE_URL correct?
   → Network can reach Supabase?
```

### Service Won't Start
```
Check Start Command:
1. Port conflicts?
   → Use PORT from environment
   
2. Database connection fails?
   → Check DATABASE_URL
   → Test locally first
   
3. Missing dependencies?
   → Ensure npm install completed
```

### Slow Responses
```
1. Check Metrics tab for CPU/memory
2. Optimize database queries
3. Upgrade to paid plan if needed
4. Add caching layer
```

---

## 📈 Free to Paid Migration

When you need production reliability:

```
Dashboard → Plan → Upgrade to Standard ($7/month)
Benefits:
- Always on (no auto-sleep)
- Better performance
- SLA support
- 24/7 uptime
```

---

## 🔗 Webhook Configuration

Render automatically sets up GitHub webhook:
- Listens to push events on main branch
- Triggers deploy on code change
- No manual configuration needed

To view: GitHub → Settings → Webhooks

---

## 📚 Resources

- Render Docs: https://render.com/docs
- Node.js Guide: https://render.com/docs/deploy-node
- Environment Variables: https://render.com/docs/environment-variables
- PostgreSQL: https://render.com/docs/databases

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] GitHub connected
- [ ] Web service created
- [ ] BUILD command correct
- [ ] START command correct
- [ ] All env variables added
- [ ] DATABASE_URL verified working
- [ ] First deploy successful
- [ ] service.render.com responding
- [ ] Logs show healthy startup
- [ ] FRONTEND_URL added to env

---

*Created: 2026-03-24*
