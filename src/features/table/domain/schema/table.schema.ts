// Third-party imports
import { z } from 'zod/v4'

// Table domain imports
import { columnValidator } from './column'

export const tableValidator = z
  .object({
    id: z.number(),
    name: z.string(),
    columns: z.array(columnValidator).default([]),
  })
  .meta({
    title: 'Table',
    description: 'The table is a collection of fields',
  })

export type TableSchema = z.infer<typeof tableValidator>
