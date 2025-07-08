import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contact_points = sqliteTable('contact_points', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  instagram: text('instagram'),
  image: text('image'),
});
