# ⚙️ UDance Technical Context

## Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience

### Database & Backend
- **Supabase**: PostgreSQL with real-time capabilities
- **Supabase Auth**: Authentication and user management
- **Row Level Security**: Database-level security

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **PWA Support**: Progressive Web App capabilities

### State Management
- **Zustand**: Lightweight state management
- **Server State**: Next.js data fetching patterns

### Development Tools
- **pnpm**: Fast package manager
- **ESLint**: Code linting
- **TypeScript**: Static type checking

## Environment Setup

### Required Versions
- Node.js: >= 18.17.0
- pnpm: >= 8.0.0
- TypeScript: >= 5.0.0

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Database Schema
```sql
-- Users table (managed by Supabase Auth)
-- Additional custom tables as needed
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Development Workflow
1. **Local Development**: `pnpm dev`
2. **Type Checking**: `pnpm run type-check`
3. **Linting**: `pnpm lint`
4. **Building**: `pnpm build`

## Deployment
- **Platform**: Vercel
- **Automatic**: Git-based deployments
- **Environment**: Production variables in Vercel dashboard 