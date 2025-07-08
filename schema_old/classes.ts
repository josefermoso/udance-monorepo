import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { dance_types } from './dance_types';
import { levels } from './levels';
import { rooms } from './rooms';

export const classes = sqliteTable('classes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  room_id: integer('room_id')
    .notNull()
    .references(() => rooms.id),
  dance_type_id: integer('dance_type_id')
    .notNull()
    .references(() => dance_types.id),
  level_id: integer('level_id')
    .notNull()
    .references(() => levels.id),
  date: text('date').notNull(),
  time: text('time').notNull(),
  duration: integer('duration'),
  description: text('description'),
  recurring: integer('recurring').default(0),
});
