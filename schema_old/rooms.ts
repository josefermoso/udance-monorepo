import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import { schools } from './schools';

export const rooms = sqliteTable(
  'rooms',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    capacity: integer('capacity').notNull(),
    school_id: integer('school_id')
      .notNull()
      .references(() => schools.id),
  },
  (table) => {
    return {
      unq: unique().on(table.school_id, table.name),
    };
  }
);
