import { z } from 'zod'
import { tableValidator } from './table.validator'

export const appValidator = z.object({
  name: z.string().trim().min(3),
  tables: z.array(tableValidator).optional(),
})
