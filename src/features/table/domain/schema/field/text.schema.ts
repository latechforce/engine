import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const textFieldSchema = baseFieldSchema
  .extend({
    type: z.enum(['single-line-text', 'long-text', 'phone-number', 'email', 'url']),
    default: z.string().optional(),
  })
  .meta({
    title: 'Text Field',
    description: 'The text field is a field that can contain a text',
  })

export type TextFieldSchema = z.infer<typeof textFieldSchema>
