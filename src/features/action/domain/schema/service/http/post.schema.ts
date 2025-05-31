import { z } from 'zod/v4'
import { baseHttpActionSchema } from './base'

export const postHttpActionSchema = baseHttpActionSchema
  .extend({
    action: z.literal('post'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
    body: z.record(z.string(), z.unknown()).optional(),
  })
  .meta({
    title: 'POST',
    description: 'The POST HTTP action is an action that is performed by the automation',
  })

export type PostHttpActionSchema = z.infer<typeof postHttpActionSchema>
