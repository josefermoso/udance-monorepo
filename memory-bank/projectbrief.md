# 🎯 UDance Project Brief

## Core Mission
Migrate UDance dance community platform from Cloudflare Workers architecture to Next.js 15 + Supabase for simplified development and faster iteration.

## Project Scope
- **Source Architecture**: Cloudflare Workers (complex to maintain)
- **Target Architecture**: Next.js 15 + Supabase + Vercel
- **Goal**: Functional dance community platform with auth and content management

## Key Requirements
1. **Google OAuth Authentication** - Users can log in with Google
2. **Public API** - Endpoint returning word list (no auth required)
3. **Private Dashboard** - Protected content after login at `/dashboard`
4. **CI/CD Pipeline** - Automated deployment and quality gates
5. **Cross-Platform** - Web + Mobile (React Native/PWA)

## Success Criteria
- ✅ Users can authenticate with Google OAuth
- ✅ Public API returns data without authentication
- ✅ Dashboard is protected and accessible post-login
- ✅ Automated deployment pipeline working
- ✅ Documentation updated to reflect new architecture

## Timeline
- **Phase 1**: Authentication + Basic Endpoints
- **Phase 2**: Dashboard Implementation
- **Phase 3**: CI/CD Pipeline
- **Phase 4**: Documentation Update

## Technology Stack
- **Framework**: Next.js 15 + React 19
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Google OAuth
- **Deployment**: Vercel
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4 