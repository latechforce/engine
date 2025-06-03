import { z } from 'zod/v4'

export const containsConditionSchema = z.object({
  input: z.string(),
  operator: z.literal('contains'),
  value: z.string(),
})

export type ContainsConditionSchema = z.infer<typeof containsConditionSchema>
