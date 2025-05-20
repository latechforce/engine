import { z } from 'zod'
import { basehttpTriggerValidator } from './base'

export const getHttpTriggerValidator = basehttpTriggerValidator.extend({
  event: z.literal('get'),
  path: z.string(),
  respondImmediately: z.boolean().default(false).optional(),
})

export type GetHttpTriggerSchema = z.infer<typeof getHttpTriggerValidator>
