import { z } from 'zod/v4'
import { baseColumnValidator } from './base'

export const singleLineTextColumnValidator = baseColumnValidator
  .extend({
    type: z.literal('single-line-text'),
  })
  .meta({
    title: 'Single Line Text',
    description: 'The single line text field is a field that can contain a single line of text',
  })

export type SingleLineTextColumnSchema = z.infer<typeof singleLineTextColumnValidator>
