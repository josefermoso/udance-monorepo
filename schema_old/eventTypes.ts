import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const eventTypes = sqliteTable('event_types', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
});

export const selectEventTypesSchema = createSelectSchema(eventTypes);
export const insertEventTypesSchema = createInsertSchema(eventTypes).omit({
  id: true,
});
