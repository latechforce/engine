import { z } from 'zod'
import { baseFieldValidator } from './base'

export const singleLineTextFieldValidator = baseFieldValidator.extend({
  type: z.literal('single-line-text'),
})

export type SingleLineTextFieldSchema = z.infer<typeof singleLineTextFieldValidator>
