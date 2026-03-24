# Supabase Setup Guide

## 📌 Quick Setup

### 1. Create Supabase Project

```bash
# Go to https://supabase.com/dashboard
# Sign in or create account
# Click "New Project"

Project Details:
- Name: car-marketplace
- Database Password: [Save this securely]
- Region: [Choose nearest to your users]
- Pricing Plan: Free (Upgrade later if needed)
```

### 2. Get Connection String

```
Dashboard → Settings (Bottom) → Database → Connection Pooling

Type: SELECT
Copy: "URI" (using pgbouncer)

Format:
postgresql://postgres.[PROJECT_ID]:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
```

### 3. Migrate Database Schema

```bash
# Install dependencies if not already done
cd Backend
npm install

# Set database URL
$env:DATABASE_URL = "postgresql://postgres.[PROJECT_ID]:password@db.[PROJECT_ID].supabase.co:5432/postgres"

# Run migrations
npx prisma migrate deploy

# Or create initial schema
npx prisma db push

# Verify schema
npx prisma studio
```

### 4. Configure Backend

**File: `Backend/.env.production`**
```
DATABASE_URL=postgresql://postgres.[PROJECT_ID]:PASSWORD@db.[PROJECT_ID].supabase.co:5432/postgres
JWT_SECRET=your-strong-secret-key
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 🔐 Supabase Security

### Enable RLS (Row Level Security)

```sql
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());
```

### Set Strong Password

Database Settings → Change Password → Strong password (min 16 chars)

### Enable SSL

Connection Info → SSL Mode: Require

---

## 📊 Verify Setup

```bash
# Test connection
psql postgresql://postgres.[PROJECT_ID]:PASSWORD@db.[PROJECT_ID].supabase.co:5432/postgres

# Check tables
\dt

# Check schema
\d users

# Check data
SELECT COUNT(*) FROM users;
```

---

## 🔄 Backups

Supabase automatically backs up daily:

Dashboard → Settings → Database → Backups
- Free tier: 7-day backup retention
- Pro tier: 30-day retention

---

## 📱 API Access

Supabase generates auto-generated REST API:

```
https://[PROJECT_ID].supabase.co/rest/v1/
```

Example:
```bash
curl https://xxxx.supabase.co/rest/v1/users \
  -H "apikey: [ANON_KEY]"
```

(Optional: Use REST API instead of custom backend)

---

## 🆘 Troubleshooting

### Connection Timeout
- Check IP whitelist (usually disabled for Supabase)
- Verify password is correct
- Verify port is 5432

### Migration Failed
```bash
# View migrations
npx prisma migrate status

# Reset and retry
npx prisma migrate resolve --rolled-back "[migration_name]"
npx prisma migrate deploy
```

### Schema Mismatch
```bash
# Sync schema
npx prisma db push --skip-generate

# Generate client
npx prisma generate
```

---

## 📚 Resources

- Supabase Docs: https://supabase.com/docs
- Prisma + Supabase: https://www.prisma.io/docs/guides/database/using-prisma-with-supabase
- PostgreSQL Cheatsheet: https://www.postgresql.org/docs/

---

*Created: 2026-03-24*
