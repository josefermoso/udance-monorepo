import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const taggings = sqliteTable('taggings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tag_id: integer('tag_id').notNull(),
  entity_id: integer('entity_id').notNull(),
  entity_type: text('entity_type').notNull(), // 'news', 'class', etc.
});
