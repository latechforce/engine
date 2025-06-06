import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const bucket = sqliteTable('bucket', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const object = sqliteTable('object', {
  id: text('id').primaryKey(),
  bucket_id: integer('bucket_id')
    .notNull()
    .references(() => bucket.id, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  size: integer('size'),
  content_type: text('content_type'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  data: blob('data', { mode: 'buffer' }).notNull(),
})
