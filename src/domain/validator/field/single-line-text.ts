import { z } from 'zod/v4'
import { baseFieldValidator } from './base'

export const singleLineTextFieldValidator = baseFieldValidator
  .extend({
    type: z.literal('single-line-text'),
  })
  .meta({
    title: 'Single Line Text',
    description: 'The single line text field is a field that can contain a single line of text',
  })

export type SingleLineTextFieldSchema = z.infer<typeof singleLineTextFieldValidator>
