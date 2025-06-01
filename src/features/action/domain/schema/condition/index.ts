import { z } from 'zod/v4'
import { isNotEmptyConditionSchema } from './is-not-empty.schema'

export const conditionSchema = z.union([isNotEmptyConditionSchema])

export type ConditionSchema = z.infer<typeof conditionSchema>
