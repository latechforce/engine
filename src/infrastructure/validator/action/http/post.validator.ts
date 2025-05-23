import { z } from 'zod/v4'
import { baseHttpActionValidator } from './base'

export const postHttpActionValidator = baseHttpActionValidator
  .extend({
    action: z.literal('post'),
    url: z.string(),
    // headers: z.record(z.string(), z.string()).optional(),
  })
  .meta({
    title: 'GET HTTP ',
    description: 'The GET HTTP action is an action that is performed by the automation',
  })

export type PostHttpActionSchema = z.infer<typeof postHttpActionValidator>
