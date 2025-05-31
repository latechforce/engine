import { z } from 'zod/v4'
import { singleLineTextFieldSchema } from './single-line-text.schema'
import { longTextFieldSchema } from './long-text.schema'

export const fieldSchema = z.union([singleLineTextFieldSchema, longTextFieldSchema]).meta({
  title: 'Field',
  description: 'The field is a field of a table',
})

export type FieldSchema = z.infer<typeof fieldSchema>
