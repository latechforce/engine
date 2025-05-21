import { z } from 'zod/v4'
import { baseFieldValidator } from './base'

export const longTextFieldValidator = baseFieldValidator
  .extend({
    type: z.literal('long-text'),
  })
  .meta({
    title: 'Long Text',
    description: 'The long text field is a field that can contain a long text',
  })

export type LongTextFieldSchema = z.infer<typeof longTextFieldValidator>
