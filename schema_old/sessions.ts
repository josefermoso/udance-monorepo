import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
  id: text('id').notNull(),
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull(),
  expires: text('expires').notNull(),
});

export default sessions;
