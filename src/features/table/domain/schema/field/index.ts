import { z } from 'zod/v4'
import { textFieldSchema } from './text.schema'
import { checkboxFieldSchema } from './checkbox.schema'
import { selectFieldSchema } from './select.schema'

export const fieldSchema = z.union([textFieldSchema, checkboxFieldSchema, selectFieldSchema]).meta({
  title: 'Field',
  description: 'The field is a field of a table',
})

export type FieldSchema = z.infer<typeof fieldSchema>
