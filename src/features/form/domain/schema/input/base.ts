// Third-party imports
import { z } from 'zod/v4'

export const baseInputSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
})
