// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { baseInputValidator } from './base'

export const textInputValidator = baseInputValidator.extend({
  defaultValue: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.enum(['single-line-text', 'long-text', 'phone', 'email', 'url']),
})

export type TextInputSchema = z.infer<typeof textInputValidator>
