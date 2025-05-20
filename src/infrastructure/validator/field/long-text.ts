import { z } from 'zod'
import { baseFieldValidator } from './base'

export const longTextFieldValidator = baseFieldValidator.extend({
  type: z.literal('long-text'),
})

export type LongTextFieldSchema = z.infer<typeof longTextFieldValidator>
