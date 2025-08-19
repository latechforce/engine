import { z } from 'zod/v4'
import { baseHttpActionSchema } from './base'

export const responseHttpActionSchema = baseHttpActionSchema
  .extend({
    action: z.literal('response'),
    params: z
      .object({
        headers: z.record(z.string(), z.string()).optional(),
        body: z.union([z.record(z.string(), z.unknown()), z.string()]).optional(),
      })
      .optional(),
  })
  .meta({
    title: 'Response',
    description: 'The response HTTP action is an action that is performed by the automation',
  })

export type ResponseHttpActionSchema = z.infer<typeof responseHttpActionSchema>
