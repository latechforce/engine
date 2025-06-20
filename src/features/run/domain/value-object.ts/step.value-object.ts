import type { ActionStep } from './action-step.value-object'
import type { TriggerStep } from './trigger-step.value-object'

export type Steps = [TriggerStep, ...ActionStep[]]
