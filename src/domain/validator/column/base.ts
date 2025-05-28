import { z } from 'zod/v4'

export const baseColumnValidator = z.object({
  id: z.number(),
  name: z.string(),
})
