import { z } from 'zod/v4'
import { baseInputValidator } from './base'

export const checkboxInputValidator = baseInputValidator.extend({
  defaultValue: z.boolean().optional(),
  type: z.literal('checkbox'),
})

export type CheckboxInputSchema = z.infer<typeof checkboxInputValidator>
