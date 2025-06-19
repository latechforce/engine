import { pgTable, text, timestamp, json, integer } from 'drizzle-orm/pg-core'
import type { AutomationSchema } from '../../../../features/automation/domain/schema/automation.schema'

export const run = pgTable('run', {
  id: text('id').primaryKey(),
  automation_id: integer('automation_id').notNull(),
  automation_schema: json('automation_schema').$type<AutomationSchema>().notNull(),
  status: text('status', { enum: ['playing', 'success', 'stopped', 'filtered'] }).notNull(),
  data: json('data').$type<Record<string, Record<string, unknown>>>().notNull(),
  last_action_name: text('last_action_name'),
  error_message: text('error_message'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})
