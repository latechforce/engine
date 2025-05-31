import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const longTextFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('long-text'),
    default: z.string().optional(),
  })
  .meta({
    title: 'Long Text',
    description: 'The long text field is a field that can contain a long text',
  })

export type LongTextFieldSchema = z.infer<typeof longTextFieldSchema>
