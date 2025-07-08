import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const news = sqliteTable('news', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  picture_url: text('picture_url'),
  author: text('author').notNull(), // References users.id
  date: text('date').notNull(),
  content: text('content').notNull(), // Stores markup text
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const selectNewsSchema = createSelectSchema(news);

export const insertNewsSchema = createInsertSchema(news, {
  title: (schema) => schema.title.min(10).max(40),
  content: (schema) => schema.content.min(100),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchNewsSchema = insertNewsSchema.partial();
