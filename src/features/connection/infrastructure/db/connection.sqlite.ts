import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const connection_status = sqliteTable('connection_status', {
  id: integer('id').primaryKey(),
  connected: integer('connected', { mode: 'boolean' }).notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const token = sqliteTable('token', {
  id: integer('id').primaryKey(),
  token_type: text('token_type').notNull(),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token'),
  // In seconds
  expires_in: integer('expires_in'),
  scope: text('scope'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
})
