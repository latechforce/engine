import { pgTable, text, timestamp, json, integer, boolean } from 'drizzle-orm/pg-core'
import type { AutomationSchema } from '@/types'

export const run = pgTable('run', {
  id: text().primaryKey(),
  automation_schema: json().$type<AutomationSchema>().notNull(),
  status: text({ enum: ['playing', 'success', 'stopped'] }).notNull(),
  data: json().$type<Record<string, object>>().notNull(),
  last_action_name: text(),
  error_message: text(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

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
