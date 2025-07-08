import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';

import { events } from './events';
import { organizers } from './organizers';

export const eventOrganizers = sqliteTable(
  'event_organizers',
  {
    event_id: integer('event_id', { mode: 'number' })
      .references(() => events.id)
      .notNull(),
    organizer_id: integer('organizer_id', { mode: 'number' })
      .references(() => organizers.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey(table.event_id, table.organizer_id),
  })
);
