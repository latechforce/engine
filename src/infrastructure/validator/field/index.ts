import { z } from 'zod'
import { singleLineTextFieldValidator } from './single-line-text'
import { longTextFieldValidator } from './long-text'

export const fieldValidator = z.union([singleLineTextFieldValidator, longTextFieldValidator])

export type FieldSchema = z.infer<typeof fieldValidator>
