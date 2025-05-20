import { z } from 'zod'
import { basehttpTriggerValidator } from './base'
import { jsonSchemaValidator } from '../../json-schema.validator'

export const postHttpTriggerValidator = basehttpTriggerValidator.extend({
  event: z.literal('post'),
  path: z.string(),
  respondImmediately: z.boolean().default(false).optional(),
  requestBody: jsonSchemaValidator.optional(),
})

export type PostHttpTriggerSchema = z.infer<typeof postHttpTriggerValidator>
