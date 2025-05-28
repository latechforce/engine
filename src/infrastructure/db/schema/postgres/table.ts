import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const table = pgTable('table', {
  id: integer().primaryKey(),
  name: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const field = pgTable('field', {
  id: integer().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  type: text().notNull(),
})

export const record = pgTable('record', {
  id: text().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const recordColumn = pgTable('record_field', {
  id: text().primaryKey(),
  record_id: text()
    .notNull()
    .references(() => record.id, { onDelete: 'cascade' }),
  field_id: integer()
    .notNull()
    .references(() => field.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})
