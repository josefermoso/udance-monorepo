# Vercel Project Consolidation Analysis

## Current State Documentation

### Vercel Projects Discovery
**Total Projects Found:** 12 projects under josefermosos-projects
**Target Projects for Consolidation:**
1. `udance-prod` - https://udance-prod-git-main-josefermosos-projects.vercel.app
2. `udance-staging` - https://udance-staging.vercel.app  
3. `udance-dev` - https://udance-dev-josefermosos-projects.vercel.app

**Additional Projects (for cleanup consideration):**
- `udance` - https://udance-josefermosos-projects.vercel.app (base project)
- `web` - No production URL
- `udance-production-temp` - No production URL
- `udance-staging-temp` - No production URL  
- `udance-new` - https://udance-new.vercel.app

### Environment Variables Analysis

#### Production Project (udance-prod)
```
Environment Variables (17 total):
 SUPABASE_ANON_KEY                  Production                          
 NEXT_PUBLIC_SUPABASE_ANON_KEY      Production                          
 SUPABASE_URL                       Production                          
 NEXT_PUBLIC_SUPABASE_URL           Production                          
 GOOGLE_CLIENT_ID                   Production                          
 NEXT_PUBLIC_AUTH_REDIRECT_URL      Preview                             
 NEXT_PUBLIC_SUPABASE_ANON_KEY      Preview                             
 NEXT_PUBLIC_SUPABASE_URL           Preview                             
 SUPABASE_DATABASE_URL              Development, Preview, Production    
 SUPABASE_SERVICE_ROLE_KEY          Production                          
 GOOGLE_CLIENT_SECRET               Development & Production            
 NEXT_PUBLIC_GOOGLE_CLIENT_ID       Development & Production            
 NODE_ENV                           Production, Preview, Development    
 NEXTAUTH_SECRET                    Production, Preview, Development    
 NEXTAUTH_URL                       Production, Preview, Development    
```

#### Staging Project (udance-staging)
```
Environment Variables (11 total):
 SUPABASE_URL                       Production, Preview, Development    
 NEXT_PUBLIC_GOOGLE_CLIENT_ID       Production, Preview, Development    
 NEXTAUTH_URL                       Production, Preview, Development    
 SUPABASE_ANON_KEY                  Production, Preview, Development    
 NEXT_PUBLIC_SUPABASE_ANON_KEY      Production, Preview, Development    
 NEXT_PUBLIC_SUPABASE_URL           Production, Preview, Development    
 NEXT_PUBLIC_AUTH_REDIRECT_URL      Production, Preview, Development    
 SUPABASE_SERVICE_ROLE_KEY          Development, Preview, Production    
 SUPABASE_DATABASE_URL              Development, Preview, Production    
 NEXTAUTH_SECRET                    Development, Preview, Production    
 GOOGLE_CLIENT_ID                   Development, Preview, Production    
```

#### Development Project (udance-dev)
```
Environment Variables (13 total):
 NEXT_PUBLIC_AUTH_REDIRECT_URL      Production, Preview, Development    
 NEXT_PUBLIC_SUPABASE_URL           Production, Preview, Development    
 SUPABASE_URL                       Production, Preview, Development    
 SUPABASE_ANON_KEY                  Production, Preview, Development    
 SUPABASE_DATABASE_URL              Development, Preview, Production    
 SUPABASE_SERVICE_ROLE_KEY          Production, Preview, Development    
 NEXT_PUBLIC_SUPABASE_ANON_KEY      Production, Preview, Development    
 GOOGLE_CLIENT_ID                   Production, Preview, Development    
 GOOGLE_CLIENT_SECRET               Production, Preview, Development    
 NEXT_PUBLIC_GOOGLE_CLIENT_ID       Production, Preview, Development    
 NODE_ENV                           Production, Preview, Development    
 NEXTAUTH_SECRET                    Production, Preview, Development    
 NEXTAUTH_URL                       Production, Preview, Development    
```

### Domain Configuration
- **Production Domain:** udance-prod-git-main-josefermosos-projects.vercel.app
- **Staging Domain:** udance-staging.vercel.app
- **Development Domain:** udance-dev-josefermosos-projects.vercel.app

### Build Configuration
- **Framework:** Next.js
- **Node Version:** 22.x
- **Monorepo Path:** Needs to be set to `apps/web`

## Migration Strategy

### New Project Configuration Plan
**Project Name:** `udance-web`
**Framework:** Next.js
**Root Directory:** `apps/web`
**Build Settings:** Auto-detect from Next.js

### Environment Variable Migration Plan
1. Extract all variables from each existing project
2. Map to new environment structure:
   - Production environment ← udance-prod variables
   - Preview environment ← udance-staging variables  
   - Development environment ← udance-dev variables

### Domain Migration Plan
1. Keep existing projects active during transition
2. Configure new domains on udance-web
3. Test thoroughly before DNS cutover
4. Update Supabase OAuth URLs

## Risk Assessment
- **High Risk:** DNS cutover and OAuth callback changes
- **Medium Risk:** Environment variable migration errors
- **Low Risk:** Build configuration changes

## Rollback Plan
1. Keep all existing projects active until verification complete
2. Document all current configurations before changes
3. Have DNS rollback ready
4. Test rollback procedure before starting

## Migration Results

### New Project Created: udance-web
- **Project URL:** https://udance-ak6g1b37d-josefermosos-projects.vercel.app
- **Framework:** Next.js auto-detected
- **Monorepo Path:** Auto-detected `apps/web`
- **Build Status:** ✅ Successful (1m 6s build time)

### Environment Variables Migration Status
✅ **Production Environment:** 12 variables migrated successfully
✅ **Preview Environment:** 11 variables migrated successfully  
✅ **Development Environment:** 13 variables migrated successfully

### Build Verification
✅ All dependencies installed correctly
✅ Turbo build working with monorepo
✅ Next.js compilation successful
✅ Static generation working (14 routes)
✅ API routes functional

### Next Steps Required
1. **Update Supabase OAuth URLs** (Manual step required)
   - Add: `https://udance-ak6g1b37d-josefermosos-projects.vercel.app/auth/callback`
   - Add: `https://*.vercel.app/auth/callback` (for preview deployments)
   
2. **Test Authentication Flow**
3. **Configure Custom Domains** (Optional)
4. **Update GitHub Actions** (Remove old project deployments)

---
*Analysis Started: July 10, 2025*
*Status: Phase 2 Complete - Environment Variables Migrated Successfully* 