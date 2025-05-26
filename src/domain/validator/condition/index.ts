import { z } from 'zod/v4'
import { isNotEmptyConditionValidator } from './is-not-empty'

export const conditionValidator = z.union([isNotEmptyConditionValidator])

export type ConditionSchema = z.infer<typeof conditionValidator>
