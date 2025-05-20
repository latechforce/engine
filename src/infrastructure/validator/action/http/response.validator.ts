import { z } from 'zod'
import { baseHttpActionValidator } from './base'

export const responseHttpActionValidator = baseHttpActionValidator.extend({
  action: z.literal('response'),
  body: z.record(z.unknown()).optional(),
})

export type ResponseHttpActionSchema = z.infer<typeof responseHttpActionValidator>
