import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const bucket = sqliteTable('bucket', {
  id: integer().primaryKey(),
  name: text('name').notNull().unique(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
})

export const object = sqliteTable('object', {
  id: text().primaryKey(),
  bucket_id: integer()
    .notNull()
    .references(() => bucket.id, { onDelete: 'cascade' }),
  key: text().notNull(),
  size: integer(),
  content_type: text(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
  data: blob({ mode: 'buffer' }).notNull(),
})
