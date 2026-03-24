# Vercel Deployment Quick Start

## 🚀 5-Minute Setup

### 1. Connect GitHub to Vercel

```bash
# Login to https://vercel.com with GitHub
# Click "Add New..." → "Project"
# Select repository: car-marketplace
# Framework: Vite
# Root Directory: Frontend
```

### 2. Add Environment Variables

**Project Settings → Environment Variables:**

```
VITE_API_URL = https://your-backend-api.render.com
VITE_GEMINI_API_KEY = sk-your-gemini-key
VITE_APP_ENV = production
```

### 3. Deploy

```bash
Click "Deploy"
# Vercel builds and deploys automatically
# Get URL: https://your-project.vercel.app
```

### 4. Configure Custom Domain (Optional)

```
Settings → Domains → Add Domain
- Point your domain DNS to Vercel
- Vercel provides DNS records
- Wait 24-48 hours for propagation
```

---

## ⚙️ Configuration Files

### `vercel.json`
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

### Environment Variables
- **Development**: `.env.local`
- **Production**: Set in Vercel Dashboard
- **Preview**: Inherited from Production

---

## 🔄 Automatic Deployments

Each push to `main` triggers:
1. New build
2. Type checking
3. Tests (if configured)
4. Deploy to production
5. Auto-generated URL: `https://your-project.vercel.app`

**Branch Deployments** (optional):
```
Settings → Git → Deploy on Push
Enable "Preview Deployments"
```

Each PR will get preview URL before merging.

---

## 📊 Monitoring

### Deployment Logs
```
Deployments → Select deployment → View logs
```

### Analytics
```
Analytics → View performance data
- Page load speed
- Edge middleware timing
- Traffic patterns
```

### Error Tracking
```
Settings → Monitoring
- Error notifications
- Uptime monitoring
- Performance metrics
```

---

## 🎯 Best Practices

1. **Environment Variables**: Never commit `.env`
2. **Build Command**: `npm run build` must succeed locally first
3. **Node Version**: Specify in `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

4. **Build Optimization**: Use `npm run build` before pushing
5. **Monitoring**: Enable analytics and error tracking

---

## 🚨 Troubleshooting

### Build Fails
```
# Check locally
npm run build

# Common issues:
# 1. Environment variables missing
# 2. TypeScript errors
# 3. Port already in use
```

### Slow Performance
- Enable caching: Settings → Caching
- Use edge middleware: middleware.ts
- Optimize images: Use next/image or vite plugins

### Environment Variables Not Working
```
# Check Vercel Dashboard
Settings → Environment Variables

# Redeploy after adding:
Deployments → Redeploy → Confirm
```

---

## 💡 Advanced Features

### Middleware (Edge Functions)
```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Add custom logic
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
```

### API Routes (Serverless Functions)
```
Frontend/api/route.ts → Becomes /api endpoint
Auto-deployed as serverless function
```

### Preview Deployments
```
Each push to non-main branch creates preview URL
Share with team for testing before merging
```

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Help: https://vercel.com/support
- Community: https://github.com/vercel/next.js/discussions

---

*Created: 2026-03-24*
