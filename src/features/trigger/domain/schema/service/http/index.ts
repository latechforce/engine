import { z } from 'zod/v4'
import { postHttpTriggerSchema } from './post.schema'
import { getHttpTriggerSchema } from './get.schema'

export const httpTriggerSchema = z.union([postHttpTriggerSchema, getHttpTriggerSchema]).meta({
  title: 'HTTP',
  description: 'The HTTP trigger is a trigger that is triggered by an HTTP request',
})

export type HttpTriggerSchema = z.infer<typeof httpTriggerSchema>
