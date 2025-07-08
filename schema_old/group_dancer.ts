import { integer, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

export const group_dancer = sqliteTable(
  'group_dancer',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    group_id: integer('group_id').notNull(),
    dancer_id: integer('dancer_id').notNull(),
    year: integer('year').notNull(),
  },
  (table) => {
    return {
      unq: unique().on(table.group_id, table.dancer_id, table.year),
    };
  }
);
