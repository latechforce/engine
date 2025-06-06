import { pgTable, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core'
import type { AutomationSchema } from '../../domain/schema/automation.schema'

export const automation_status = pgTable('automation_status', {
  id: integer('id').primaryKey(),
  active: boolean('active').notNull(),
  schema: json('schema').$type<AutomationSchema>().notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})
