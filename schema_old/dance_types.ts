import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dance_types = sqliteTable('dance_types', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
});
