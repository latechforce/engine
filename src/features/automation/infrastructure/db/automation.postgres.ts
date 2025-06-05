import { pgTable, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core'
import type { AutomationSchema } from '../../domain/schema/automation.schema'

export const automation_status = pgTable('automation_status', {
  id: integer().primaryKey(),
  active: boolean().notNull(),
  schema: json().$type<AutomationSchema>().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})
