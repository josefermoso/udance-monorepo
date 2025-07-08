import { integer, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

export const events_djs = sqliteTable(
  'events_djs',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    event_id: integer('event_id').notNull(),
    dj_id: integer('dj_id').notNull(),
  },
  (table) => {
    return {
      unq: unique().on(table.event_id, table.dj_id),
    };
  }
);
