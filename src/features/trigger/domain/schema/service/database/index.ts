import { z } from 'zod/v4'
import { recordCreatedDatabaseTriggerSchema } from './record-created.schema'

export const databaseTriggerSchema = z.union([recordCreatedDatabaseTriggerSchema]).meta({
  title: 'Database',
  description: 'The database trigger is a trigger that is triggered by a database event',
})

export type DatabaseTriggerSchema = z.infer<typeof databaseTriggerSchema>
