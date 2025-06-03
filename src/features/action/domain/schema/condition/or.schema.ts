import { z } from 'zod/v4'
import { conditionsSchema, type ConditionsSchema } from '.'

type OrCondition = {
  or: ConditionsSchema[]
}

export const orConditionSchema: z.ZodType<OrCondition> = z.lazy(() =>
  z.object({
    or: z.array(conditionsSchema),
  })
)

export type OrConditionSchema = z.infer<typeof orConditionSchema>
