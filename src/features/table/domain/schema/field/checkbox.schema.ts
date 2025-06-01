import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const checkboxFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('checkbox'),
    default: z.boolean().optional(),
  })
  .meta({
    title: 'Checkbox Field',
    description: 'The checkbox field is a field that can contain a checkbox',
  })

export type CheckboxFieldSchema = z.infer<typeof checkboxFieldSchema>
