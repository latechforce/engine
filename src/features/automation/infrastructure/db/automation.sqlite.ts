import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AutomationSchema } from '../../domain/schema/automation.schema'

export const automation_status = sqliteTable('automation_status', {
  id: integer('id').primaryKey(),
  active: integer('active', { mode: 'boolean' }).notNull(),
  schema: text('schema', { mode: 'json' }).$type<AutomationSchema>().notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
