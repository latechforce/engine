// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { basehttpTriggerValidator } from './base'
import { jsonSchemaValidator } from '@/trigger/domain/schema/json-schema.schema'

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
