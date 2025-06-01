import { pgTable, text, timestamp, integer, customType } from 'drizzle-orm/pg-core'

const bytea = customType<{
  data: Buffer
  driverData: Buffer
}>({
  dataType() {
    return 'bytea'
  },
})

export const bucket = pgTable('bucket', {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
  created_at: timestamp().notNull(),
})

export const object = pgTable('object', {
  id: text().primaryKey(),
  bucket_id: integer()
    .notNull()
    .references(() => bucket.id, { onDelete: 'cascade' }),
  key: text().notNull(),
  size: integer(),
  content_type: text(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
  data: bytea().notNull(),
})
