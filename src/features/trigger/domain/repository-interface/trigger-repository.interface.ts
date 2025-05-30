import type { JSONSchema7 } from '@/shared/domain/schema/json-schema.schema'
import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

export type ITriggerRepository = {
  debug(message: string): void
  setupIntegration(trigger: IntegrationTrigger): Promise<void>
  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown>
  validateData(schema: JSONSchema7, data: unknown): boolean
}
