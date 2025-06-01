import { z } from 'zod/v4'

export const baseFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean().optional(),
})
