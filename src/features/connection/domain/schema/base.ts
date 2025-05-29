import { z } from 'zod/v4'

export const baseConnectionValidator = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .strict()
