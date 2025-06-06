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
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  created_at: timestamp('created_at').notNull(),
})

export const object = pgTable('object', {
  id: text('id').primaryKey(),
  bucket_id: integer('bucket_id')
    .notNull()
    .references(() => bucket.id, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  size: integer('size'),
  content_type: text('content_type'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  data: bytea('data').notNull(),
})
