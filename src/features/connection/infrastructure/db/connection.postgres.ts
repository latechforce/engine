import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const connection_status = pgTable('connection_status', {
  id: integer().primaryKey(),
  connected: boolean().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const token = pgTable('token', {
  id: integer().primaryKey(),
  token_type: text().notNull(),
  access_token: text().notNull(),
  refresh_token: text(),
  expires_in: integer(),
  scope: text(),
  created_at: timestamp().notNull(),
})
