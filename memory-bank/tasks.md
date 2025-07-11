# UDance - Active Tasks

## 🎯 Current Development Status
**Phase:** Infrastructure Optimization - Vercel Project Consolidation
**Complexity Level:** Level 3 (Feature Development) - **PLANNING**
**Session Focus:** Consolidate three separate Vercel projects into unified deployment architecture

## 🚀 ACTIVE: Vercel Deployment Architecture Consolidation

### Task Overview
**Goal:** Consolidate three separate Vercel projects (`udance-prod`, `udance-dev`, `udance-staging`) into a single unified project `udance-web` with proper environment management.

**Why This Matters:**
- Reduces deployment complexity and maintenance overhead
- Leverages Vercel's native environment system (Production/Preview/Development)
- Eliminates duplicated CI/CD workflows and variable management
- Reduces costs (one build per commit instead of three)
- Simplifies domain and SSL certificate management

### Complexity Assessment
**Level:** 3 (Feature Development)
**Reasoning:** 
- Multiple system integrations (Vercel, GitHub Actions, DNS, Supabase)
- Critical infrastructure changes affecting all environments
- Requires careful rollback planning
- Involves external service configurations

### Technology Stack
- **Platform:** Vercel (single project with multiple environments)
- **Framework:** Next.js 15 (existing, no changes)
- **CI/CD:** GitHub Actions (simplified workflow)
- **Environment Management:** Vercel native environments
- **DNS:** Domain reassignment to new project

### Technology Validation Checkpoints
- [ ] New Vercel project creation verified
- [ ] Environment variable migration tested
- [ ] Build configuration validated for monorepo path
- [ ] Preview URL generation confirmed
- [ ] Domain assignment process validated

## Implementation Plan

### Phase 1: Preparation & Analysis (30 minutes)
1. **Current State Documentation**
   - [ ] Document all environment variables from `udance-prod`
   - [ ] Document all environment variables from `udance-staging` 
   - [ ] Document all environment variables from `udance-dev`
   - [ ] Document current domain configurations
   - [ ] Document GitHub Actions workflows affected

2. **Backup & Safety**
   - [ ] Export deployment logs from existing projects
   - [ ] Document current performance metrics
   - [ ] Create rollback plan documentation
   - [ ] Verify backup access to all configurations

### Phase 2: New Project Creation (45 minutes)
1. **Vercel Project Setup**
   - [ ] Create new Vercel project `udance-web`
   - [ ] Configure monorepo path: `apps/web`
   - [ ] Set Next.js framework detection
   - [ ] Verify build command auto-configuration

2. **Environment Variable Migration**
   - [ ] **Production Environment:**
     - [ ] Copy all variables from `udance-prod`
     - [ ] Set as Production environment in `udance-web`
   - [ ] **Preview Environment:**
     - [ ] Copy all variables from `udance-staging`
     - [ ] Configure as Preview environment overrides
   - [ ] **Development Environment:**
     - [ ] Copy all variables from `udance-dev`
     - [ ] Configure for local development with `vercel dev`

3. **Build Verification**
   - [ ] Test initial deployment build
   - [ ] Verify all environment variables are accessible
   - [ ] Confirm app functionality in new environment

### Phase 3: DNS & Domain Configuration (30 minutes)
1. **Domain Strategy**
   - [ ] Keep `udance-prod` active during transition
   - [ ] Configure custom domains for `udance-web`:
     - [ ] Production: `udance.com` (when ready)
     - [ ] Preview: `staging.udance.com` (optional)
   - [ ] Test domain propagation and SSL generation

2. **Supabase OAuth Updates**
   - [ ] Add new Vercel URLs to Supabase Auth settings:
     - [ ] `https://udance-web.vercel.app/auth/callback`
     - [ ] `https://*.vercel.app/auth/callback` (for preview branches)
   - [ ] Keep existing URLs active until migration complete

### Phase 4: CI/CD Workflow Optimization (30 minutes)
1. **GitHub Actions Simplification**
   - [ ] Update repository secrets:
     - [ ] `VERCEL_PROJECT_ID` → new project ID
     - [ ] `VERCEL_ORG_ID` → organization ID
     - [ ] Keep `VERCEL_TOKEN` as is
   - [ ] Simplify workflow to single deployment job
   - [ ] Remove duplicate test/build steps for multiple projects

2. **Workflow Testing**
   - [ ] Test deployment trigger on feature branch (Preview)
   - [ ] Test deployment trigger on main branch (Production)
   - [ ] Verify environment variable injection works correctly

### Phase 5: Production Cutover (15 minutes)
1. **DNS Switchover**
   - [ ] Update DNS records to point to new project
   - [ ] Monitor traffic and error rates
   - [ ] Verify SSL certificates are working
   - [ ] Test all authentication flows

2. **Cleanup Preparation**
   - [ ] Document old project URLs for reference
   - [ ] Prepare cleanup checklist
   - [ ] Set calendar reminder for cleanup (after 24-48h verification)

### Phase 6: Legacy Cleanup (Future - After Verification)
1. **Project Removal** (DO AFTER CONFIRMING SUCCESS)
   - [ ] Remove `udance-dev` project
   - [ ] Remove `udance-staging` project  
   - [ ] Remove `udance-prod` project
   - [ ] Clean up old repository secrets
   - [ ] Update documentation

## Creative Phases Required
- [ ] **CI/CD Workflow Design** - Optimize GitHub Actions for single project
- [ ] **Environment Variable Strategy** - Design override patterns for different environments
- [ ] **Domain Architecture** - Plan custom domain assignments and SSL strategy

## Dependencies
- Access to Vercel dashboard with project creation permissions
- GitHub repository admin access for secrets management
- DNS management access for domain reassignment
- Supabase admin access for OAuth URL updates

## Challenges & Mitigations

| Challenge | Mitigation Strategy |
|-----------|-------------------|
| **Downtime during DNS switch** | Keep old project active until new one is verified working |
| **Environment variable mistakes** | Export all current variables before starting, verify in new project |
| **OAuth callback failures** | Add new URLs to Supabase before switching, keep old ones until cleanup |
| **CI/CD workflow breaks** | Test on feature branch first, have rollback workflow ready |
| **Preview URL confusion** | Document new preview URL patterns, communicate to team |
| **SSL certificate delays** | Test domain assignment on staging first, allow propagation time |

## Verification Checklist

### Pre-Migration Verification
- [ ] All current environment variables documented and backed up
- [ ] All custom domains and SSL certificates documented
- [ ] Current deployment workflows documented and backed up
- [ ] Rollback plan created and validated

### Post-Migration Verification
- [ ] All environments (prod/preview/dev) deploy successfully
- [ ] Environment variables accessible in all environments
- [ ] Authentication flows work in all environments
- [ ] Custom domains resolve correctly with valid SSL
- [ ] Preview deployments generate correct URLs for feature branches
- [ ] GitHub Actions trigger correctly for all branch types

## Success Criteria
✅ **Primary Goals**
- Single Vercel project managing all environments
- Reduced CI/CD complexity with maintained functionality
- All authentication and core features working across environments
- Domains properly configured with SSL

✅ **Secondary Goals**  
- Faster deployment times due to simplified workflow
- Reduced environment variable management overhead
- Better preview URL management for feature branches
- Cost reduction from consolidated builds

---

## 📋 Previous Completed Work

### ✅ COMPLETED: News Feature Implementation (100%)
- Full news system implemented with TypeScript and Next.js 15
- Production-ready with comprehensive testing and error handling
- SEO optimization and performance validation complete

---
*Last updated: Vercel Consolidation Task Created - Ready for Planning Phase*