import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AutomationSchema } from '@/types'

export const run = sqliteTable('run', {
  id: text().primaryKey(),
  automation_schema: text({ mode: 'json' }).$type<AutomationSchema>().notNull(),
  status: text({ enum: ['playing', 'success', 'stopped'] }).notNull(),
  data: text({ mode: 'json' }).$type<Record<string, object>>().notNull(),
  last_action_name: text(),
  error_message: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

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
