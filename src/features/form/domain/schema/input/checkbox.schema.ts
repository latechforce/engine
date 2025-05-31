import { z } from 'zod/v4'
import { baseInputSchema } from './base'

export const checkboxInputSchema = baseInputSchema.extend({
  defaultValue: z.boolean().optional(),
  type: z.literal('checkbox'),
})

export type CheckboxInputSchema = z.infer<typeof checkboxInputSchema>
