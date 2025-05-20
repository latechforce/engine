import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const table = sqliteTable('table', {
  id: integer().notNull(),
  name: text().notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const field = sqliteTable('field', {
  id: integer().notNull(),
  table_id: text()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const record = sqliteTable('record', {
  id: text().notNull(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const recordField = sqliteTable('record_field', {
  id: text().notNull(),
  record_id: integer()
    .notNull()
    .references(() => record.id, { onDelete: 'cascade' }),
  field_id: integer()
    .notNull()
    .references(() => field.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})
