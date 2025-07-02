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