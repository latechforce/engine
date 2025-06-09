import { z } from 'zod/v4'
import { baseHttpActionSchema } from './base'

export const responseHttpActionSchema = baseHttpActionSchema
  .extend({
    action: z.literal('response'),
    responseHttp: z.object({
      body: z.record(z.string(), z.unknown()).optional(),
    }),
  })
  .meta({
    title: 'Response',
    description: 'The response HTTP action is an action that is performed by the automation',
  })

export type ResponseHttpActionSchema = z.infer<typeof responseHttpActionSchema>
