import { z } from 'zod/v4'
import { baseInputValidator } from './base'

export const optionsInputValidator = baseInputValidator.extend({
  options: z.array(z.string()),
  type: z.enum(['single-select']),
})
