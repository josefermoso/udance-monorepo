import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable(
  'categories',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    competition_id: integer('competition_id').notNull(),
  },
  (table) => {
    return {
      unq: unique().on(table.name, table.competition_id),
    };
  }
);
