import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const singleLineTextFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('single-line-text'),
    default: z.string().optional(),
  })
  .meta({
    title: 'Single Line Text',
    description: 'The single line text field is a field that can contain a single line of text',
  })

export type SingleLineTextFieldSchema = z.infer<typeof singleLineTextFieldSchema>
