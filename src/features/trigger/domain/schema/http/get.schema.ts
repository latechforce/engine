// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { basehttpTriggerSchema } from './base'

export const getHttpTriggerSchema = basehttpTriggerSchema
  .extend({
    event: z.literal('get'),
    params: z.object({
      path: z.string(),
      respondImmediately: z.boolean().default(false).optional(),
    }),
  })
  .meta({
    title: 'GET',
    description: 'The GET HTTP trigger is a trigger that is triggered by a GET request',
  })

export type GetHttpTriggerSchema = z.infer<typeof getHttpTriggerSchema>
