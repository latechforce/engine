import { z } from 'zod/v4'
import { baseActionSchema } from '../../base'

export const basePathsActionSchema = baseActionSchema.extend({
  service: z.literal('paths'),
})
