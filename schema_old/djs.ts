import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const djs = sqliteTable('djs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  instagram: text('instagram'),
  email: text('email'),
});
