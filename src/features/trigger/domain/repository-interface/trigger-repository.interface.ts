import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

export type ITriggerRepository = {
  debug(message: string): void
  setupIntegration(trigger: IntegrationTrigger): Promise<void>
}
