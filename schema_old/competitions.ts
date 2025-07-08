import { date, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const competitions = sqliteTable('competitions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  date: date('date').notNull(),
});
