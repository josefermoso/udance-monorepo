import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const levels = sqliteTable('levels', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});
