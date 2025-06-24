import { z } from 'zod/v4'
import { baseActionSchema } from '../base'

export const baseDatabaseActionSchema = baseActionSchema.extend({
  service: z.literal('database'),
})
