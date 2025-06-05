// Third-party imports
import { z } from 'zod/v4'

export const baseConnectionSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string(),
  })
  .strict()
