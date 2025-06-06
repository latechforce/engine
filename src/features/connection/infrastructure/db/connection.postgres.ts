import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const connection_status = pgTable('connection_status', {
  id: integer('id').primaryKey(),
  connected: boolean('connected').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const token = pgTable('token', {
  id: integer('id').primaryKey(),
  token_type: text('token_type').notNull(),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token'),
  expires_in: integer('expires_in'),
  scope: text('scope'),
  created_at: timestamp('created_at').notNull(),
})
