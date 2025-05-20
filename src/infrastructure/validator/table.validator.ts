import { z } from 'zod'
import { fieldValidator } from './field'

export const tableValidator = z.object({
  id: z.number(),
  name: z.string(),
  fields: z.array(fieldValidator).default([]),
})

export type TableSchema = z.infer<typeof tableValidator>
