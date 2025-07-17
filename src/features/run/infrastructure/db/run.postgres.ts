import { pgTable, text, timestamp, json, integer, boolean } from 'drizzle-orm/pg-core'
import type { Steps } from '../../domain/value-object.ts/step.value-object'

export const run = pgTable('run', {
  id: text('id').primaryKey(),
  automation_id: integer('automation_id').notNull(),
  form_id: integer('form_id'),
  status: text('status', { enum: ['playing', 'success', 'stopped', 'filtered'] }).notNull(),
  steps: json('steps').$type<Steps>().notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  to_replay: boolean('to_replay').notNull().default(false),
})
