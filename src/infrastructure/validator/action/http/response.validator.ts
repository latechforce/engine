import { z } from 'zod/v4'
import { baseHttpActionValidator } from './base'

export const responseHttpActionValidator = baseHttpActionValidator
  .extend({
    action: z.literal('response'),
    body: z.record(z.string(), z.unknown()).optional(),
  })
  .meta({
    title: 'Response HTTP ',
    description: 'The response HTTP action is an action that is performed by the automation',
  })

export type ResponseHttpActionSchema = z.infer<typeof responseHttpActionValidator>
