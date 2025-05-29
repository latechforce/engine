import { z } from 'zod/v4'

export const isNotEmptyConditionValidator = z.object({
  input: z.string(),
  operator: z.literal('is-not-empty'),
})

export type IsNotEmptyConditionSchema = z.infer<typeof isNotEmptyConditionValidator>
