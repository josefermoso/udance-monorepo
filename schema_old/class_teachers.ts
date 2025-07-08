import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';

import { classes } from './classes';
import { dancers } from './dancers';

export const class_teachers = sqliteTable(
  'class_teachers',
  {
    class_id: integer('class_id')
      .notNull()
      .references(() => classes.id),
    dancer_id: integer('dancer_id')
      .notNull()
      .references(() => dancers.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.class_id, table.dancer_id] }),
    };
  }
);
