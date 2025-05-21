import { z } from 'zod/v4'
import { basehttpTriggerValidator } from './base'

export const getHttpTriggerValidator = basehttpTriggerValidator
  .extend({
    event: z.literal('get'),
    path: z.string(),
    respondImmediately: z.boolean().default(false).optional(),
  })
  .meta({
    title: 'Get',
    description: 'The get HTTP trigger is a trigger that is triggered by a GET request',
  })

export type GetHttpTriggerSchema = z.infer<typeof getHttpTriggerValidator>
