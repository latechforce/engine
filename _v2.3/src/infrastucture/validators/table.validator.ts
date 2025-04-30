import { z } from 'zod'
import { fieldValidator } from './field.validator'

export const tableValidator = z.object({
  id: z.number(),
  name: z.string().trim().min(3),
  fields: z.array(fieldValidator),
})
