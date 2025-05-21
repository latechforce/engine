import { z } from 'zod/v4'
import { singleLineTextFieldValidator } from './single-line-text'
import { longTextFieldValidator } from './long-text'

export const fieldValidator = z.union([singleLineTextFieldValidator, longTextFieldValidator]).meta({
  title: 'Field',
  description: 'The field is a field of a table',
})

export type FieldSchema = z.infer<typeof fieldValidator>
