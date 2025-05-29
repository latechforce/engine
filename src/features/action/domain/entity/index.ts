import type { IntegrationAction } from './integration-action.entity'
import type { ServiceAction } from './service-action.entity'

export type Action = ServiceAction | IntegrationAction
