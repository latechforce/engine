import { pgTable, text, timestamp, json } from 'drizzle-orm/pg-core'
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
