import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const schools = sqliteTable('schools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  address: text('address').notNull(),
  description: text('description'),
  image: text('image'),
  contact: text('contact'),
});
