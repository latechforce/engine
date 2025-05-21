import { z } from 'zod/v4'
import { postHttpTriggerValidator } from './post.validator'
import { getHttpTriggerValidator } from './get.validator'

export const httpTriggerValidator = z
  .union([postHttpTriggerValidator, getHttpTriggerValidator])
  .meta({
    title: 'HTTP',
    description: 'The HTTP trigger is a trigger that is triggered by an HTTP request',
  })

export type HttpTriggerSchema = z.infer<typeof httpTriggerValidator>
