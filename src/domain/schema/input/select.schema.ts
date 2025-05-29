import { z } from 'zod/v4'
import { baseInputValidator } from './base'

export const selectInputValidator = baseInputValidator.extend({
  defaultValue: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
  type: z.enum(['single-select']),
})

export type SelectInputSchema = z.infer<typeof selectInputValidator>
