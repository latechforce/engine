import { z } from 'zod/v4'
import { textFieldSchema } from './text.schema'
import { checkboxFieldSchema } from './checkbox.schema'

export const fieldSchema = z.union([textFieldSchema, checkboxFieldSchema]).meta({
  title: 'Field',
  description: 'The field is a field of a table',
})

export type FieldSchema = z.infer<typeof fieldSchema>
