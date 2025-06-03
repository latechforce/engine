import { z } from 'zod/v4'
import { conditionsSchema, type ConditionsSchema } from '.'

type AndCondition = {
  and: ConditionsSchema[]
}

export const andConditionSchema: z.ZodType<AndCondition> = z.lazy(() =>
  z.object({
    and: z.array(conditionsSchema),
  })
)

export type AndConditionSchema = z.infer<typeof andConditionSchema>
