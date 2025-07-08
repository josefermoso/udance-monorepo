// db/schema/userRoles.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// userRoles: relación N a M entre users y roles
export const userRoles = sqliteTable('userRoles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(), // references users.id
  roleId: integer('role_id', { mode: 'number' }).notNull(), // references roles.id
});
