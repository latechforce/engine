import { z } from 'zod/v4'

export const valueConditionSchema = z.object({
  target: z.string(),
  operator: z.enum(['contains', 'does-not-contain']),
  value: z.string(),
})

export type ValueConditionSchema = z.infer<typeof valueConditionSchema>
