import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { eventTypes } from './eventTypes';

export const events = sqliteTable('events', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  event_type_id: integer('event_type_id', { mode: 'number' })
    .references(() => eventTypes.id)
    .notNull(),
  name: text('name').notNull(),
  description: text('description'),
  start_date: text('start_date').notNull(),
  end_date: text('end_date').notNull(),
  location: text('location'),
});

export const selectEventsSchema = createSelectSchema(events);
export const insertEventsSchema = createInsertSchema(events).omit({
  id: true,
});
