import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tags = sqliteTable('tags', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
});
