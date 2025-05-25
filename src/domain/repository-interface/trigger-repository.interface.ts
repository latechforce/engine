import type { IntegrationTrigger } from '../entity/trigger/integration-trigger.entity'

export type ITriggerRepository = {
  debug(message: string): void
  setupIntegration(trigger: IntegrationTrigger): Promise<void>
}
