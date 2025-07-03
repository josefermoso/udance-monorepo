# 🚀 VERCEL PROJECTS SETUP GUIDE

**Generated on:** $(date)
**NextAuth Secret:** `0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71`

## 📋 OVERVIEW

Creating 3 separate Vercel projects for complete environment isolation:

```
udance-dev        → Any branch (manual testing)
udance-staging    → dev branch (auto-deploy)  
udance-prod       → main branch (auto-deploy)
```

---

## 🎯 PROJECT 1: STAGING ENVIRONMENT

### Basic Configuration
```
Project Name: udance-staging
GitHub Repo: josefermoso/udance-monorepo
Framework: Next.js
Root Directory: ./
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
Git Branch: dev (IMPORTANT: Set to dev, not main)
```

### Environment Variables
```bash
# Supabase Configuration (PENDING - Need staging project)
NEXT_PUBLIC_SUPABASE_URL=https://[STAGING-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[STAGING-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[STAGING-SERVICE-ROLE-KEY]

# Google OAuth (Copy values from secrets.md)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[COPY-FROM-SECRETS.MD]
GOOGLE_CLIENT_SECRET=[COPY-FROM-SECRETS.MD]

# NextAuth Configuration
NEXTAUTH_SECRET=0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71
NEXTAUTH_URL=https://udance-staging.vercel.app

# Environment
NODE_ENV=staging
```

---

## 🎯 PROJECT 2: PRODUCTION ENVIRONMENT

### Basic Configuration
```
Project Name: udance-prod
GitHub Repo: josefermoso/udance-monorepo
Framework: Next.js
Root Directory: ./
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
Git Branch: main
```

### Environment Variables
```bash
# Supabase Configuration (Current production - copy from secrets.md)
NEXT_PUBLIC_SUPABASE_URL=[COPY-FROM-SECRETS.MD]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[COPY-FROM-SECRETS.MD]
SUPABASE_SERVICE_ROLE_KEY=[COPY-FROM-SECRETS.MD]

# Google OAuth (Copy values from secrets.md)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[COPY-FROM-SECRETS.MD]
GOOGLE_CLIENT_SECRET=[COPY-FROM-SECRETS.MD]

# NextAuth Configuration
NEXTAUTH_SECRET=0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71
NEXTAUTH_URL=https://udance-prod.vercel.app

# Environment
NODE_ENV=production
```

---

## 🎯 PROJECT 3: DEVELOPMENT ENVIRONMENT

### Basic Configuration
```
Project Name: udance-dev
GitHub Repo: josefermoso/udance-monorepo
Framework: Next.js
Root Directory: ./
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
Git Branch: All branches (for manual testing)
```

### Environment Variables
```bash
# Supabase Configuration (PENDING - Need dev project)
NEXT_PUBLIC_SUPABASE_URL=https://[DEV-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[DEV-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[DEV-SERVICE-ROLE-KEY]

# Google OAuth (Copy values from secrets.md)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[COPY-FROM-SECRETS.MD]
GOOGLE_CLIENT_SECRET=[COPY-FROM-SECRETS.MD]

# NextAuth Configuration
NEXTAUTH_SECRET=0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71
NEXTAUTH_URL=https://udance-dev.vercel.app

# Environment
NODE_ENV=development
```

---

## 📋 SETUP CHECKLIST

### Phase 1: Vercel Projects
- [ ] Create `udance-staging` project (branch: dev)
- [ ] Create `udance-prod` project (branch: main)  
- [ ] Create `udance-dev` project (branch: all)
- [ ] Verify all projects can build successfully

### Phase 2: Supabase Projects (Next Task)
- [ ] Create staging Supabase project
- [ ] Create dev Supabase project
- [ ] Configure OAuth providers for each
- [ ] Update Vercel environment variables

### Phase 3: Verification
- [ ] Test staging deployment from dev branch
- [ ] Test production deployment from main branch
- [ ] Test manual deployment to dev environment
- [ ] Verify environment isolation

---

## 🔐 SECURITY NOTES

1. **NextAuth Secret**: Same across all environments for session compatibility
2. **Google OAuth**: Currently shared (can be separated later if needed)
3. **Supabase**: Separate projects ensure complete database isolation
4. **Environment Variables**: Never commit to Git - use Vercel dashboard only
5. **All Sensitive Values**: Copy from `secrets.md` file (not committed to Git)

---

## 🔄 DEPLOYMENT FLOW

```
feature/xyz → Push → Manual deploy to udance-dev (testing)
        ↓
    PR to dev → Auto-deploy to udance-staging (staging)
        ↓  
   PR to main → Auto-deploy to udance-prod (production)
```

---

## ⚡ NEXT STEPS

After Vercel setup:
1. Create Supabase staging and dev projects
2. Update environment variables in all Vercel projects
3. Test deployments on all environments
4. Configure GitHub Actions for automated deployments 