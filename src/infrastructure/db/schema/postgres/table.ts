import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const table = pgTable('table', {
  id: integer().notNull(),
  name: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const field = pgTable('field', {
  id: integer().notNull(),
  table_id: text()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const record = pgTable('record', {
  id: text().notNull(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const recordField = pgTable('record_field', {
  id: text().notNull(),
  record_id: integer()
    .notNull()
    .references(() => record.id, { onDelete: 'cascade' }),
  field_id: integer()
    .notNull()
    .references(() => field.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})
