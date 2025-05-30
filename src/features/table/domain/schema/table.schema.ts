// Third-party imports
import { z } from 'zod/v4'

// Table domain imports
import { fieldValidator } from './field'

export const tableValidator = z
  .object({
    id: z.number(),
    name: z.string(),
    fields: z.array(fieldValidator).default([]),
  })
  .meta({
    title: 'Table',
    description: 'The table is a collection of fields',
  })

export type TableSchema = z.infer<typeof tableValidator>
