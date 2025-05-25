import { z } from 'zod/v4'
import { basehttpTriggerValidator } from './base'
import { jsonSchemaValidator } from '../../../json-schema.validator'

export const postHttpTriggerValidator = basehttpTriggerValidator
  .extend({
    event: z.literal('post'),
    path: z.string(),
    respondImmediately: z.boolean().default(false).optional(),
    requestBody: jsonSchemaValidator.optional(),
  })
  .meta({
    title: 'POST',
    description: 'The POST HTTP trigger is a trigger that is triggered by a POST request',
  })

export type PostHttpTriggerSchema = z.infer<typeof postHttpTriggerValidator>
