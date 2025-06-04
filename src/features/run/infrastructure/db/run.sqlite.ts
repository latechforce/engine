import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AutomationSchema } from '../../../../features/automation/domain/schema/automation.schema'

export const run = sqliteTable('run', {
  id: text().primaryKey(),
  automation_schema: text({ mode: 'json' }).$type<AutomationSchema>().notNull(),
  status: text({ enum: ['playing', 'success', 'stopped', 'filtered'] }).notNull(),
  data: text({ mode: 'json' }).$type<Record<string, Record<string, unknown>>>().notNull(),
  last_action_name: text(),
  error_message: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})
