import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const connection_status = sqliteTable('connection_status', {
  id: integer().primaryKey(),
  connected: integer({ mode: 'boolean' }).notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const token = sqliteTable('token', {
  id: integer().primaryKey(),
  token_type: text().notNull(),
  access_token: text().notNull(),
  refresh_token: text(),
  expires_in: integer(),
  scope: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
})
