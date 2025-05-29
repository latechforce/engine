import { z } from 'zod/v4'
import { postHttpTriggerValidator } from './post.schema'
import { getHttpTriggerValidator } from './get.schema'

export const httpTriggerValidator = z
  .union([postHttpTriggerValidator, getHttpTriggerValidator])
  .meta({
    title: 'HTTP',
    description: 'The HTTP trigger is a trigger that is triggered by an HTTP request',
  })

export type HttpTriggerSchema = z.infer<typeof httpTriggerValidator>
