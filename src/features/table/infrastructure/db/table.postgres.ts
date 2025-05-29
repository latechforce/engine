import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const table = pgTable('table', {
  id: integer().primaryKey(),
  name: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const column = pgTable('column', {
  id: integer().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const row = pgTable('row', {
  id: text().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const rowColumn = pgTable('row_column', {
  id: text().primaryKey(),
  row_id: text()
    .notNull()
    .references(() => row.id, { onDelete: 'cascade' }),
  column_id: integer()
    .notNull()
    .references(() => column.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})
