import { z } from 'zod/v4'
import { valueConditionSchema } from './value.schema'
import { operatorConditionSchema } from './operator.schema'
import { andConditionSchema } from './and.schema'

export const conditionsSchema = z.union([
  valueConditionSchema,
  operatorConditionSchema,
  andConditionSchema,
])

export type ConditionsSchema = z.infer<typeof conditionsSchema>
