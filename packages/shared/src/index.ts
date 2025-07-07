// Export database types and utilities
export type * from './database.types';

// Export Supabase clients
export { createClient } from './supabase/client';
export { createClient as createServerClient } from './supabase/server';
export { updateSession } from './supabase/middleware';

// Export database schema and utilities
export { runMigration } from './migrate';

// Re-export Supabase types for convenience
export type { User, Session } from '@supabase/supabase-js';
