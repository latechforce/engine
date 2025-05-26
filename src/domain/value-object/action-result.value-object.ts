import type { IntegrationError } from './integration-error.value.object'
import type { ServiceError } from './service-error.value-object'

export type ActionResult<T = IntegrationError | ServiceError> =
  | {
      data: object
      error?: undefined
    }
  | {
      data?: undefined
      error: T
    }
