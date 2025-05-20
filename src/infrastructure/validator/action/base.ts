import { z } from 'zod'

export const baseActionValidator = z
  .object({
    name: z.string(),
  })
  .strict()
