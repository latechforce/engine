import { z } from 'zod/v4'

export const baseActionValidator = z
  .object({
    name: z.string(),
  })
  .strict()
