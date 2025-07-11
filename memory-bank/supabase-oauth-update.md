# Supabase OAuth Configuration Update

## Current Status
✅ New project `udance-web` deployed successfully  
✅ Environment variables migrated (36 variables across 3 environments)
✅ Build completed successfully (1m 6s)
✅ Deployment URL active: https://udance-ak6g1b37d-josefermosos-projects.vercel.app
🔄 **Next Step: Update Supabase OAuth URLs**

## URLs to Add in Supabase Dashboard

### 1. Go to Supabase Dashboard
- Project: `gcjdwjsexwxxwbciqvkl` 
- Navigate to: **Authentication > URL Configuration**

### 2. Add these URLs to "Redirect URLs":

#### New Project URL (Primary)
```
https://udance-web.vercel.app/auth/callback
```

#### Preview/Branch Deployments (Wildcard)
```
https://*.vercel.app/auth/callback
```

#### Development (Already exists)
```
http://localhost:3000/auth/callback
```

### 3. Site URL Configuration
Update **Site URL** to:
```
https://udance-web.vercel.app
```

## Current OAuth URLs (Keep These Active During Transition)
- `https://udance-prod.vercel.app/auth/callback`
- `https://udance-staging.vercel.app/auth/callback` 
- `https://udance-dev-josefermosos-projects.vercel.app/auth/callback`

## Post-Configuration Testing
After adding the URLs, test:
1. Visit: `https://udance-ak6g1b37d-josefermosos-projects.vercel.app/login`
2. Click "Continue with Google"
3. Complete OAuth flow
4. Verify redirect to `/home` works correctly

## Next Steps After OAuth Update
1. Test authentication flow
2. Create custom domain (optional)
3. Update GitHub Actions to deploy to new project
4. Remove old projects after verification 