import { integer, pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const table = pgTable('table', {
  id: integer().primaryKey(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const field = pgTable('table_field', {
  id: integer().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  type: text({
    enum: [
      'single-line-text',
      'long-text',
      'url',
      'email',
      'phone-number',
      'checkbox',
      'single-select',
    ],
  }).notNull(),
  required: boolean().notNull(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
})

export const record = pgTable('record', {
  id: text().primaryKey(),
  table_id: integer()
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
  archived_at: timestamp(),
})

export const recordField = pgTable('record_field', {
  id: text().primaryKey(),
  record_id: text()
    .notNull()
    .references(() => record.id, { onDelete: 'cascade' }),
  table_field_id: integer()
    .notNull()
    .references(() => field.id, { onDelete: 'cascade' }),
  value: text(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
  archived_at: timestamp(),
})
