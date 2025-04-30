import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const tablesPgTable = pgTable('tables', {
  id: integer().notNull().primaryKey(),
  name: varchar().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
})
