import {
  integer,
  pgTable,
  text,
  timestamp,
  boolean,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core'

export const table = pgTable('table', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const field = pgTable(
  'table_field',
  {
    id: integer('id').notNull(),
    table_id: integer('table_id')
      .notNull()
      .references(() => table.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
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
    required: boolean('required').notNull(),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull(),
  },
  (field) => [primaryKey({ columns: [field.id, field.table_id] })]
)

export const record = pgTable('record', {
  id: text('id').primaryKey(),
  table_id: integer('table_id')
    .notNull()
    .references(() => table.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  archived_at: timestamp('archived_at'),
})

export const recordField = pgTable(
  'record_field',
  {
    id: text('id').primaryKey(),
    record_id: text('record_id')
      .notNull()
      .references(() => record.id, { onDelete: 'cascade' }),
    table_id: integer('table_id').notNull(),
    table_field_id: integer('table_field_id').notNull(),
    value: text('value'),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull(),
    archived_at: timestamp('archived_at'),
  },
  (recordField) => [
    foreignKey({
      columns: [recordField.table_field_id, recordField.table_id],
      foreignColumns: [field.id, field.table_id],
      name: 'record_field_table_field_fk',
    }),
  ]
)
