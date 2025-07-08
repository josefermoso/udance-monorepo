import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'packages/domain/news/schema.ts',
  out: 'packages/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
});
