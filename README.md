# Car Marketplace

A full-stack car marketplace application with modern web technologies.

**Project Status**: Production-Ready with Automated Deployments

---

## 🚀 Quick Links

### Development
- [Quick Start](QUICK_START.md) - Get started locally in 5 minutes
- [Setup Instructions](README_SETUP.md) - Complete project guide

### Production Deployment
- [Deployment Master Guide](DEPLOYMENT_GUIDE.md) - Complete deployment strategy
- [Supabase Setup](SUPABASE_SETUP.md) - Database configuration
- [Vercel Deployment](VERCEL_DEPLOYMENT.md) - Frontend deployment
- [Render Backend](RENDER_DEPLOYMENT.md) - Backend deployment
- [GitHub Setup](GITHUB_SETUP.md) - CI/CD and automation

### API Documentation
- [API Reference](API_DOCUMENTATION.md) - All endpoints and examples

---

## 📋 Project Overview

### Technology Stack

**Frontend**
- React 19 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Zustand for state management
- Axios for API calls

**Backend**
- NestJS framework
- PostgreSQL with Prisma ORM
- JWT authentication
- Class-validator for validation

**Infrastructure**
- **Database**: Supabase (PostgreSQL)
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render.com
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions

---

## 🎯 Production Deployment Architecture

```
User Browser
   ↓
[Vercel CDN] ← Frontend (https://your-app.vercel.app)
   ↓
[Render.com] ← Backend API (https://your-api.render.com)
   ↓
[Supabase] ← PostgreSQL Database
```

### Deployment Features
- ✅ Automatic deployments on GitHub push
- ✅ Environment-based configuration
- ✅ Database migrations on deploy
- ✅ Zero-downtime updates
- ✅ Monitoring and logging
- ✅ Rollback capability

---

## 🚀 Getting Started

### For Local Development

```bash
# 1. Clone repository
git clone https://github.com/your-username/car-marketplace.git
cd car-marketplace

# 2. Setup Backend
cd Backend
npm install
cp .env.example .env
npm run db:generate
npm run start:dev

# 3. Setup Frontend (new terminal)
cd Frontend
npm install
npm run dev
```

See [QUICK_START.md](QUICK_START.md) for detailed instructions.

### For Production Deployment

1. **Set up Supabase** → [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. **Deploy Backend to Render** → [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
3. **Deploy Frontend to Vercel** → [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
4. **Configure GitHub CI/CD** → [GITHUB_SETUP.md](GITHUB_SETUP.md)

Full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📊 Features

### Authentication
- User signup and signin
- JWT-based authentication
- Role-based access (Buyer/Seller/Admin)
- Password hashing with bcrypt

### Listings Management
- Create and manage car listings
- Search and filter by body type, brand, price
- Image upload support
- Status tracking (Pending, Approved, Sold)

### Lead Management
- Buyers can express interest in listings
- Sellers receive lead notifications
- Lead status tracking (New, Contacted, Closed)

---

## 🔐 Security Features

- ✅ CORS properly configured
- ✅ Environment-based secrets management
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Input validation with class-validator
- ✅ SQL injection prevention (Prisma ORM)
- ✅ HTTPS enforced in production

---

## 📈 Available Scripts

### Backend

```bash
npm run start          # Start production server
npm run start:dev      # Start with hot reload
npm run build          # Build for production
npm run db:generate    # Generate Prisma Client
npm run db:migrate     # Run database migrations
npm run lint           # Lint code
npm run format         # Format with Prettier
```

### Frontend

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Type check
npm run type-check     # TypeScript validation
npm run clean          # Clean dist folder
```

---

## 🌐 Live Deployments

Once deployed:

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-api.render.com
- **API Docs**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🔄 CI/CD Workflow

```
Push to main branch
      ↓
GitHub Actions triggered
      ↓
┌─────────────────────┬─────────────────────┐
│                     │                     │
Frontend Workflow  Backend Workflow
│                     │                     │
├─ Type check    ├─ npm install
├─ Build         ├─ npm run build
├─ Deploy to     ├─ Deploy to
│  Vercel        │  Render
│                     │
└─────────────────────┴─────────────────────┘
      ↓
Production updated
```

---

## 📚 Documentation

### Getting Started
- [QUICK_START.md](QUICK_START.md) - 5-minute setup
- [README_SETUP.md](README_SETUP.md) - Complete setup
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference

### Deployment
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Master guide
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Frontend
- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Backend
- [GITHUB_SETUP.md](GITHUB_SETUP.md) - CI/CD

---

## 🛠️ System Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **PostgreSQL**: 12+ (or Supabase)

---

## 📞 Support & Resources

### Official Docs
- [React Documentation](https://react.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "Add amazing feature"`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request for review
5. After approval, merge to main
6. Automatic deployment triggers

---

*Last Updated: 2026-03-24*
*Production Ready: Yes*
