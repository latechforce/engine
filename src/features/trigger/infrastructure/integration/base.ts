// Connection domain imports
import type { Token } from '@/connection/domain/value-object/token.value-object'

// Trigger domain imports
import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

export type BaseIntegration = {
  setupTrigger(trigger: IntegrationTrigger, token: Token): Promise<void>
}
