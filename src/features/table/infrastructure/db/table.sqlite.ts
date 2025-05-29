import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const table = sqliteTable('table', {
  id: integer().primaryKey(),
  name: text().notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const column = sqliteTable('column', {
  id: integer().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const row = sqliteTable('row', {
  id: text().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const rowColumn = sqliteTable('row_column', {
  id: text().primaryKey(),
  row_id: text()
    .notNull()
    .references(() => row.id, { onDelete: 'cascade' }),
  column_id: integer()
    .notNull()
    .references(() => column.id, { onDelete: 'cascade' }),
  value: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})
