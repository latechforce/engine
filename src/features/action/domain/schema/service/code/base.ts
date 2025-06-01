import { z } from 'zod/v4'
import { baseActionSchema } from '../../base'

export const baseCodeActionSchema = baseActionSchema.extend({
  service: z.literal('code'),
})
