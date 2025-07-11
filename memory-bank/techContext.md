# ⚙️ UDance Technical Context

## Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience

### Database & Backend
- **Supabase**: PostgreSQL with real-time capabilities
- **Drizzle ORM**: Type-safe database queries and schema management
- **Drizzle Kit**: Database migration and schema generation tools
- **Supabase Auth**: Authentication and user management
- **Row Level Security**: Database-level security

### Styling & UI
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **DaisyUI v5**: Component library (Admin app only)
- **Responsive Design**: Mobile-first approach
- **PWA Support**: Progressive Web App capabilities

### State Management
- **Zustand**: Lightweight state management
- **Server State**: Next.js data fetching patterns

### Development Tools
- **pnpm**: Fast package manager
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Turbo**: Monorepo build system

### Validation & Types
- **Zod**: Runtime type validation
- **TypeScript**: Compile-time type safety
- **Drizzle Types**: Auto-generated database types

## Database Architecture

### 🗄️ Database Stack
- **Database**: Supabase PostgreSQL (Production & Staging)
- **ORM**: Drizzle ORM for type-safe queries
- **Migrations**: Drizzle Kit for schema management
- **Validation**: Zod schemas for input validation
- **Type Safety**: End-to-end TypeScript types

### 📁 Database Structure

```
packages/
├── shared/src/
│   ├── db.ts              # Drizzle client configuration
│   └── supabase/          # Supabase client utilities
├── domain/
│   └── news/              # News domain package
│       ├── schema.ts      # Drizzle table definitions
│       ├── zod.ts         # Zod validation schemas
│       ├── queries.ts     # Query functions
│       └── commands.ts    # CRUD operations
└── db/
    └── migrations/        # Generated SQL migrations
        ├── 0000_spicy_johnny_storm.sql
        └── _meta/         # Migration metadata
```

### 🔧 Database Configuration

#### Drizzle Configuration (`drizzle.config.ts`)
```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: "postgresql",
  schema: "packages/domain/news/schema.ts",
  out: "packages/db/migrations",
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
});
```

#### Database Client (`packages/shared/src/db.ts`)
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.SUPABASE_DATABASE_URL!);
export const db = drizzle(client);
```

### 📋 Migration Workflow

#### 1. Schema Definition
```typescript
// packages/domain/news/schema.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  published_at: timestamp('published_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
```

#### 2. Generate Migration
```bash
pnpm drizzle-kit generate
```

#### 3. Apply Migration
```bash
pnpm drizzle-kit migrate
```

#### 4. Verify Schema
```bash
# Query database to verify changes
source .env && psql $SUPABASE_DATABASE_URL -c "SELECT * FROM news LIMIT 5;"
```

### 🔍 Query Patterns

#### Domain Query Functions (`packages/domain/news/queries.ts`)
```typescript
import { db } from '@udance/shared/db';
import { news } from './schema';
import { eq, desc } from 'drizzle-orm';

export async function getPublishedNews() {
  return await db
    .select()
    .from(news)
    .where(eq(news.published_at, true))
    .orderBy(desc(news.created_at));
}

export async function getFeaturedNews(limit = 3) {
  return await db
    .select()
    .from(news)
    .orderBy(desc(news.created_at))
    .limit(limit);
}
```

#### Server Actions (`apps/web/src/app/(public)/news/actions.ts`)
```typescript
'use server';
import { getPublishedNews } from '@udance/domain/news/queries';

export async function listNewsAction() {
  return await getPublishedNews();
}
```

### 🛡️ Type Safety & Validation

#### Zod Schemas (`packages/domain/news/zod.ts`)
```typescript
import { z } from 'zod';

export const NewsInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(1, 'Author is required'),
});

export const NewsFilterSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type NewsInput = z.infer<typeof NewsInputSchema>;
export type NewsFilter = z.infer<typeof NewsFilterSchema>;
```

#### TypeScript Types
```typescript
// Auto-generated from Drizzle schema
export type News = typeof news.$inferSelect;
export type NewsInsert = typeof news.$inferInsert;
```

## Environment Setup

### Required Versions
- Node.js: >= 18.17.0
- pnpm: >= 8.0.0
- TypeScript: >= 5.0.0
- PostgreSQL: 14+ (via Supabase)

### Environment Variables

The project now relies on **one Vercel project (`udance-web`)** with three built-in environments:

| Scope | Purpose | Key differences |
|-------|---------|-----------------|
| **Production** | Public site (`udance-web.vercel.app` + custom domain) | `NEXTAUTH_URL` set to production URL. |
| **Preview** | Ephemeral URL per pull-request / CLI preview | *No* `NEXTAUTH_URL` – NextAuth automatically picks `VERCEL_URL`. |
| **Development** | Local dev via `pnpm dev` or `vercel dev` | `NEXTAUTH_URL=http://localhost:3000` |

Redirects are built **dynamically in code** (`window.location.origin + '/auth/callback'`), so the deprecated `NEXT_PUBLIC_AUTH_REDIRECT_URL` var has been removed.

#### Minimal `.env.local` for local development
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DATABASE_URL=postgresql://...

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# NextAuth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

### Database Schema Current State

#### News Table
```sql
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Seed Data
```sql
-- Sample news articles loaded via supabase/seed.sql
INSERT INTO news (title, content, author) VALUES 
('Bienvenidos a UDance', 'Contenido de bienvenida...', 'Equipo UDance'),
('Festival de Salsa 2025', 'Detalles del festival...', 'María González');
```

## Development Workflow

### Database Operations
1. **Schema Changes**: Modify `packages/domain/*/schema.ts`
2. **Generate Migration**: `pnpm drizzle-kit generate`
3. **Apply Migration**: `pnpm drizzle-kit migrate`
4. **Update Seed Data**: Modify `supabase/seed.sql`
5. **Load Seed Data**: `source .env && psql $SUPABASE_DATABASE_URL -f supabase/seed.sql`

### Local Development
1. **Start All Apps**: `pnpm dev:all`
2. **Type Checking**: `pnpm run type-check`
3. **Linting**: `pnpm lint`
4. **Building**: `pnpm build`
5. **Database Studio**: `pnpm drizzle-kit studio` (optional)

### Testing Database
```bash
# Test database connection
source .env && psql $SUPABASE_DATABASE_URL -c "SELECT version();"

# Query news data
source .env && psql $SUPABASE_DATABASE_URL -c "SELECT id, title, published_at FROM news ORDER BY created_at DESC;"
```

## Deployment

### Platform
- **Platform**: Vercel
- **Automatic**: Git-based deployments
- **Environment**: Production variables in Vercel dashboard
- **Database**: Supabase production environment

### Multi-App Deployment
- **Web App**: `apps/web/` → udance-prod.vercel.app
- **Admin App**: `apps/admin/` → udance-admin-prod.vercel.app  
- **PWA App**: `apps/pwa/` → udance-pwa-prod.vercel.app

### Database Deployment Notes
- **Migrations**: Run in production via deployment scripts
- **Environment Variables**: Separate production database URLs
- **Connection Pooling**: Use Supabase pooler in production 