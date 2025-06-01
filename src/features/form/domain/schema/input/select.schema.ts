import { z } from 'zod/v4'
import { baseInputSchema } from './base'

export const selectInputSchema = baseInputSchema
  .extend({
    defaultValue: z.string().optional(),
    placeholder: z.string().optional(),
    options: z.array(z.object({ label: z.string(), value: z.string() })),
    type: z.enum(['single-select']),
  })
  .meta({
    title: 'Select Input',
    description: 'The select input is a input that can contain a select',
  })

export type SelectInputSchema = z.infer<typeof selectInputSchema>
