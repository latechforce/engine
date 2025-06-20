import type {
  PathSchema,
  SplitIntoPathsFilterActionSchema,
} from '../../../../features/action/domain/schema/filter/split-into-paths.schema'
import type { ActionStep } from './action-step.value-object'

export type PathStep = {
  schema: PathSchema
  input: Record<string, unknown>
  output: Record<string, unknown>
  actions: ActionStep[]
}

export type PathsStep = {
  type: 'paths'
  createdAt: string
  schema: Omit<SplitIntoPathsFilterActionSchema, 'params'>
  paths: PathStep[]
}
