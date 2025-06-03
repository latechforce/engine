import { z } from 'zod/v4'
import { valueConditionSchema } from './value.schema'
import { operatorConditionSchema } from './operator.schema'
import { andConditionSchema } from './and.schema'
import { orConditionSchema } from './or.schema'

export const conditionsSchema = z.union([
  valueConditionSchema,
  operatorConditionSchema,
  andConditionSchema,
  orConditionSchema,
])

export type ConditionsSchema = z.infer<typeof conditionsSchema>
