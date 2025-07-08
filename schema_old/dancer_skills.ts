import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';

import { dance_types } from './dance_types';
import { dancers } from './dancers';
import { levels } from './levels';

export const dancer_skills = sqliteTable(
  'dancer_skills',
  {
    dancer_id: integer('dancer_id')
      .notNull()
      .references(() => dancers.id),
    dance_type_id: integer('dance_type_id')
      .notNull()
      .references(() => dance_types.id),
    level_id: integer('level_id')
      .notNull()
      .references(() => levels.id),
    can_teach: integer('can_teach').notNull().default(0), // 1 if the dancer can teach
  },
  (table) => {
    return {
      pk: primaryKey(table.dancer_id, table.dance_type_id, table.level_id),
    };
  }
);
