import { z } from 'zod/v4'
import { baseDatabaseTriggerSchema } from './base'

export const recordCreatedDatabaseTriggerSchema = baseDatabaseTriggerSchema
  .extend({
    event: z.literal('record-created'),
    recordCreatedDatabase: z.object({
      table: z.string(),
    }),
  })
  .meta({
    title: 'Record Created',
    description:
      'The Record Created trigger is a trigger that is triggered by a record being created',
  })

export type RecordCreatedDatabaseTriggerSchema = z.infer<typeof recordCreatedDatabaseTriggerSchema>
