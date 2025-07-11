# 🏗️ UDance System Patterns

## Architecture Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │────│   Next.js API   │────│   Supabase DB   │
│  (React/PWA)    │    │     Routes      │    │  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                        ┌─────────────────┐
                        │ Supabase Auth   │
                        │ (Google OAuth)  │
                        └─────────────────┘
```

## Key Design Patterns

### Authentication Pattern
- **Provider**: Supabase Auth with Google OAuth
- **Session Management**: Server-side sessions via middleware
- **Protected Routes**: Middleware-based route protection
- **State**: Zustand store for auth state

### API Design Pattern
- **Public Routes**: `/api/public/*` - No authentication required
- **Protected Routes**: `/api/protected/*` - Authentication required
- **RESTful Design**: Standard HTTP methods and status codes

### Database Patterns
- **Row Level Security (RLS)**: Supabase native security
- **Type Safety**: Generated TypeScript types from Supabase
- **Real-time**: Supabase subscriptions for live updates

### State Management Pattern
- **Global State**: Zustand for authentication and user data
- **Server State**: Next.js built-in data fetching
- **Form State**: React built-in useState for forms

### CI/CD Deployment Pattern
- **Single Vercel Project (`udance-web`)**: manages Production, Preview, Development.
- **GitHub → Vercel Integration**: push to `main` triggers Production build; PRs & `vercel --prod=false` trigger Preview.
- **Environment Variables**: managed per-environment in Vercel dashboard; secrets never committed.
- **Protected Main**: GitHub Secret-Scanning blocks any commit containing credentials; pre-commit hook + husky scripts enforce lint/type-check/test before commit.

### Dynamic OAuth Redirect Pattern
- `redirectTo` built at runtime using `window.location.origin` ensuring correct callback across local, preview, production without env vars.
- Eliminates `NEXT_PUBLIC_AUTH_REDIRECT_URL` and reduces misconfiguration risk.

## Component Architecture
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Auth callbacks
│   ├── dashboard/      # Protected pages
│   └── (public)/       # Public pages
├── components/         # Reusable components
├── lib/               # Utilities and configs
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts # Generated types
├── store/             # Zustand stores
└── middleware.ts      # Auth middleware
```

## Security Patterns
- **Environment Variables**: All secrets in .env.local
- **CORS**: Configured in Next.js API routes
- **Rate Limiting**: Via Vercel edge functions
- **Input Validation**: Zod schemas for API inputs 