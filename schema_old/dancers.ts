import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dancers = sqliteTable('dancers', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  description: text('description'),
  image: text('image'),
  instagram: text('instagram'),
  external_links: text('external_links', { mode: 'json' }).$type<string[]>(),
});
