import { z } from 'zod/v4'
import { baseActionSchema } from '../../base'

export const baseHttpActionSchema = baseActionSchema.extend({
  service: z.literal('http'),
})
