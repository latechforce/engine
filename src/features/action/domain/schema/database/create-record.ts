import { z } from 'zod/v4'
import { baseDatabaseActionSchema } from './base'

export const createRecordActionSchema = baseDatabaseActionSchema
  .extend({
    action: z.literal('create-record'),
    params: z.object({
      table: z.union([z.string(), z.number()]),
      fields: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
    }),
  })
  .meta({
    title: 'Create record',
    description: 'Create a record in a database table',
  })

export type CreateRecordActionSchema = z.infer<typeof createRecordActionSchema>
