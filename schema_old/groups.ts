import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const groups = sqliteTable('groups', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
  image: text('image'),
  year: integer('year').notNull(),
});
