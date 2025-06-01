import { z } from 'zod/v4'
import { baseHttpActionSchema } from './base'

export const getHttpActionSchema = baseHttpActionSchema
  .extend({
    action: z.literal('get'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
  })
  .meta({
    title: 'GET',
    description: 'The GET HTTP action is an action that is performed by the automation',
  })

export type GetHttpActionSchema = z.infer<typeof getHttpActionSchema>
