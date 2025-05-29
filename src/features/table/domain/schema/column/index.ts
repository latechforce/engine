import { z } from 'zod/v4'
import { singleLineTextColumnValidator } from './single-line-text.schema'
import { longTextColumnValidator } from './long-text.schema'

export const columnValidator = z
  .union([singleLineTextColumnValidator, longTextColumnValidator])
  .meta({
    title: 'Column',
    description: 'The field is a field of a table',
  })

export type ColumnSchema = z.infer<typeof columnValidator>
