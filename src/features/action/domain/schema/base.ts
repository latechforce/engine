import { z } from 'zod/v4'

export const baseActionSchema = z
  .object({
    name: z.string(),
  })
  .strict()
