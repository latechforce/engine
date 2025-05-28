import { z } from 'zod/v4'
import { singleLineTextColumnValidator } from './single-line-text'
import { longTextColumnValidator } from './long-text'

export const fieldValidator = z
  .union([singleLineTextColumnValidator, longTextColumnValidator])
  .meta({
    title: 'Column',
    description: 'The field is a field of a table',
  })

export type ColumnSchema = z.infer<typeof fieldValidator>
