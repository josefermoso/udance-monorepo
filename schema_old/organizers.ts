import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const organizers = sqliteTable('organizers', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  contact_info: text('contact_info'),
  description: text('description'),
  image: text('image'),
});

export const selectOrganizersSchema = createSelectSchema(organizers);
export const insertOrganizersSchema = createInsertSchema(organizers).omit({
  id: true,
});
