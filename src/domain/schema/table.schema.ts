import { z } from 'zod/v4'
import { fieldValidator } from './column'

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
