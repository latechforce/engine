import type { IntegrationError } from './integration-error.value-object'
import type { ServiceError } from './service-error.value-object'

export type ActionResult<T = IntegrationError | ServiceError> =
  | {
      data: Record<string, unknown>
      error?: undefined
    }
  | {
      data?: undefined
      error: T
    }
