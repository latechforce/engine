import { z } from 'zod/v4'
import { baseInputSchema } from './base'

export const checkboxInputSchema = baseInputSchema
  .extend({
    defaultValue: z.boolean().optional(),
    type: z.literal('checkbox'),
  })
  .meta({
    title: 'Checkbox Input',
    description: 'The checkbox input is a input that can contain a checkbox',
  })

export type CheckboxInputSchema = z.infer<typeof checkboxInputSchema>
