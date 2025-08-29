// Third-party imports
import { z } from 'zod/v4'
import pkg from 'package.json'

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
    version: pkg.version,
  })

export type TableSchema = z.infer<typeof tableSchema>
