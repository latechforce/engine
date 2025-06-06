import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const selectFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('single-select'),
    default: z.string().optional(),
    options: z.array(z.string()).default([]),
  })
  .meta({
    title: 'Single Select Field',
    description: 'The single select field is a field that can contain a single select',
  })

export type SelectFieldSchema = z.infer<typeof selectFieldSchema>
