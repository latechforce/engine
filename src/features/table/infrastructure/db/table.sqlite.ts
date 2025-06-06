import { integer, sqliteTable, text, primaryKey, foreignKey } from 'drizzle-orm/sqlite-core'

export const table = sqliteTable('table', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const field = sqliteTable(
  'table_field',
  {
    id: integer('id').notNull(),
    table_id: integer('table_id')
      .notNull()
      .references(() => table.id, { onDelete: 'cascade' }),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    type: text('type', {
      enum: [
        'single-line-text',
        'long-text',
        'url',
        'email',
        'phone-number',
        'checkbox',
        'single-select',
        'single-attachment',
      ],
    }).notNull(),
    required: integer('required', { mode: 'boolean' }).notNull(),
    created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
    updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (field) => [primaryKey({ columns: [field.id, field.table_id] })]
)

export const record = sqliteTable('record', {
  id: text('id').primaryKey(),
  table_id: integer('table_id')
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  archived_at: integer('archived_at', { mode: 'timestamp' }),
})

export const recordField = sqliteTable(
  'record_field',
  {
    id: text('id').primaryKey(),
    record_id: text('record_id')
      .notNull()
      .references(() => record.id, { onDelete: 'cascade' }),
    table_id: integer('table_id').notNull(),
    table_field_id: integer('table_field_id').notNull(),
    value: text('value'),
    created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
    updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
    archived_at: integer('archived_at', { mode: 'timestamp' }),
  },
  (recordField) => [
    foreignKey({
      columns: [recordField.table_field_id, recordField.table_id],
      foreignColumns: [field.id, field.table_id],
      name: 'record_field_table_field_fk',
    }),
  ]
)
