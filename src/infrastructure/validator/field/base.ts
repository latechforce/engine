import { z } from 'zod'

export const baseFieldValidator = z.object({
  id: z.number(),
  name: z.string(),
})
