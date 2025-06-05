// Third-party imports
import { z } from 'zod/v4'

// Table domain imports
import { fieldSchema } from './field'

export const tableSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string(),
    fields: z.array(fieldSchema).default([]),
  })
  .meta({
    title: 'Table',
    description: 'The table is a collection of fields',
  })

export type TableSchema = z.infer<typeof tableSchema>
