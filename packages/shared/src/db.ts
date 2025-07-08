import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error('SUPABASE_DATABASE_URL env not set');
}

// Disable prepare for Supabase connection-pool (transaction mode)
const client = postgres(process.env.SUPABASE_DATABASE_URL, { prepare: false });

export const db = drizzle(client);
