import { z } from 'zod/v4'
import { baseDatabaseTriggerSchema } from './base'

export const recordUpdatedDatabaseTriggerSchema = baseDatabaseTriggerSchema
  .extend({
    event: z.literal('record-updated'),
    recordUpdatedDatabase: z.object({
      table: z.string(),
    }),
  })
  .meta({
    title: 'Record Updated',
    description:
      'The Record Updated trigger is a trigger that is triggered by a record being updated',
  })

export type RecordUpdatedDatabaseTriggerSchema = z.infer<typeof recordUpdatedDatabaseTriggerSchema>
