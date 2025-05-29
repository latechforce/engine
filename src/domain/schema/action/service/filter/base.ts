import { z } from 'zod/v4'
import { baseActionValidator } from '../../base'

export const baseFilterActionValidator = baseActionValidator.extend({
  service: z.literal('filter'),
})
