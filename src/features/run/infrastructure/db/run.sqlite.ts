import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AutomationSchema } from '../../../../features/automation/domain/schema/automation.schema'

export const run = sqliteTable('run', {
  id: text('id').primaryKey(),
  automation_schema: text('automation_schema', { mode: 'json' })
    .$type<AutomationSchema>()
    .notNull(),
  status: text('status', { enum: ['playing', 'success', 'stopped', 'filtered'] }).notNull(),
  data: text('data', { mode: 'json' }).$type<Record<string, Record<string, unknown>>>().notNull(),
  last_action_name: text('last_action_name'),
  error_message: text('error_message'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
