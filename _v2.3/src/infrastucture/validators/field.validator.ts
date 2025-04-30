import { z } from 'zod'

export const fieldValidator = z.object({
  id: z.number(),
  name: z.string().trim().min(3),
  type: z.enum(['text']),
})
