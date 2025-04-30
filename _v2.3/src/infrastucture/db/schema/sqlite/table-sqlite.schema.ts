import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tablesSqliteTable = sqliteTable('tables', {
  id: int().notNull().primaryKey(),
  name: text().notNull(),
  created_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
