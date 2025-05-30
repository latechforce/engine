// Trigger domain imports
import type { IntegrationTrigger } from './integration-trigger.entity'
import type { ServiceTrigger } from './service-trigger.entity'

export type Trigger = IntegrationTrigger | ServiceTrigger
