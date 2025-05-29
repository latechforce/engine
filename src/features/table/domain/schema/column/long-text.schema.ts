import { z } from 'zod/v4'
import { baseColumnValidator } from './base'

export const longTextColumnValidator = baseColumnValidator
  .extend({
    type: z.literal('long-text'),
  })
  .meta({
    title: 'Long Text',
    description: 'The long text field is a field that can contain a long text',
  })

export type LongTextColumnSchema = z.infer<typeof longTextColumnValidator>
