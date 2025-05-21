import { z } from 'zod/v4'

export const baseFieldValidator = z.object({
  id: z.number(),
  name: z.string(),
})
