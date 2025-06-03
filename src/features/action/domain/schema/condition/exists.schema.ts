import { z } from 'zod/v4'

export const existsConditionSchema = z.object({
  input: z.string(),
  operator: z.literal('exists'),
})

export type ExistsConditionSchema = z.infer<typeof existsConditionSchema>
