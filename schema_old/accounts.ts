import type { AdapterAccount } from 'next-auth/adapters';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const accounts = sqliteTable('accounts', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<AdapterAccount>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
  oauth_token_secret: text('oauth_token_secret'),
  oauth_token: text('oauth_token'),
});
