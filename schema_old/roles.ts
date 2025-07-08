// db/schema/roles.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const roles = sqliteTable('roles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  // Ej: "admin", "organizer", "user", etc.
  roleName: text('role_name').notNull(),
});
