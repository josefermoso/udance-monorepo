import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary'),
  imageUrl: text('image_url'),
  authorId: uuid('author_id'),
  category: text('category'),
  tags: text('tags').array(),
  isFeatured: boolean('is_featured').default(false),
  status: text('status', { enum: ['draft', 'published', 'archived'] }).default(
    'draft'
  ),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Export inferred types
export type News = typeof news.$inferSelect;
export type NewsInsert = typeof news.$inferInsert;
