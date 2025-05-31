import { z } from 'zod/v4'
import { baseActionSchema } from '../../base'

export const baseFilterActionSchema = baseActionSchema.extend({
  service: z.literal('filter'),
})
