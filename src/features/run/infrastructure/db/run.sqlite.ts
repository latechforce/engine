import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { Steps } from '../../domain/value-object.ts/step.value-object'

export const run = sqliteTable('run', {
  id: text('id').primaryKey(),
  automation_id: integer('automation_id').notNull(),
  form_id: integer('form_id'),
  status: text('status', { enum: ['playing', 'success', 'stopped', 'filtered'] }).notNull(),
  steps: text('steps', { mode: 'json' }).$type<Steps>().notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  to_replay: integer('to_replay', { mode: 'boolean' }).notNull().default(false),
})
