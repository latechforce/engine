import { z } from 'zod/v4'

export const baseFieldSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  required: z.boolean().optional(),
})
