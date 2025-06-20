import { z } from 'zod/v4'

export const operatorConditionSchema = z.object({
  target: z.string(),
  operator: z.enum(['exists', 'does-not-exist', 'is-true', 'is-false']),
})

export type OperatorConditionSchema = z.infer<typeof operatorConditionSchema>
