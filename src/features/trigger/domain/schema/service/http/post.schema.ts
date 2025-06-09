// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { basehttpTriggerSchema } from './base'
import { jsonSchemaSchema } from '../../../../../../shared/domain/schema/json-schema.schema'

export const postHttpTriggerSchema = basehttpTriggerSchema
  .extend({
    event: z.literal('post'),
    postHttp: z.object({
      path: z.string(),
      respondImmediately: z.boolean().default(false).optional(),
      requestBody: jsonSchemaSchema.optional(),
    }),
  })
  .meta({
    title: 'POST',
    description: 'The POST HTTP trigger is a trigger that is triggered by a POST request',
  })

export type PostHttpTriggerSchema = z.infer<typeof postHttpTriggerSchema>
