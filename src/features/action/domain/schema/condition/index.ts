import { z } from 'zod/v4'
import { containsConditionSchema } from './contains.schema'
import { existsConditionSchema } from './exists.schema'
import { andConditionSchema } from './and.schema'

export const conditionsSchema = z.union([
  existsConditionSchema,
  containsConditionSchema,
  andConditionSchema,
])

export type ConditionsSchema = z.infer<typeof conditionsSchema>
