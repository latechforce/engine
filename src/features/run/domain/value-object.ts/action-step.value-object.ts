import type { ActionSchema } from '../../../action/domain/schema/action.schema'
import type { PathsStep } from './paths-step.value-object'
import type { ServiceError } from '../../../action/domain/value-object/service-error.value-object'
import type { IntegrationError } from '../../../action/domain/value-object/integration-error.value-object'

export type ActionStep =
  | {
      type: 'action'
      createdAt: string
      schema: Omit<ActionSchema, 'splitIntoPathsFilter'>
      input: Record<string, unknown>
      output?: Record<string, unknown>
      error?: IntegrationError | ServiceError
    }
  | PathsStep
