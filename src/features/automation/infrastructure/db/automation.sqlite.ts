import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AutomationSchema } from '../../domain/schema/automation.schema'

export const automation_status = sqliteTable('automation_status', {
  id: integer().primaryKey(),
  active: integer({ mode: 'boolean' }).notNull(),
  schema: text({ mode: 'json' }).$type<AutomationSchema>().notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})
