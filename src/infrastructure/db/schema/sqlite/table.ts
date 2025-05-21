import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const table = sqliteTable('table', {
  id: integer().primaryKey(),
  name: text().notNull(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const field = sqliteTable('field', {
  id: integer().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const record = sqliteTable('record', {
  id: text().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})

export const recordField = sqliteTable('record_field', {
  id: text().primaryKey(),
  record_id: text()
    .notNull()
    .references(() => record.id, { onDelete: 'cascade' }),
  field_id: integer()
    .notNull()
    .references(() => field.id, { onDelete: 'cascade' }),
  value: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
})
