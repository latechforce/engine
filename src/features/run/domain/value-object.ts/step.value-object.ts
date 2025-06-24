import type { ActionStep } from './action-step.value-object'
import type { PathsStep } from './paths-step.value-object'
import type { TriggerStep } from './trigger-step.value-object'

export type ActionOrPathsStep = ActionStep | PathsStep

export type Step = TriggerStep | ActionOrPathsStep

export type Steps = [TriggerStep, ...ActionOrPathsStep[]]
