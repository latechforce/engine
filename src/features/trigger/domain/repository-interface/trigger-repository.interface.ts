import type { JSONSchemaSchema } from '../../../../shared/domain/schema/json-schema.schema'
import type { IntegrationTrigger } from '../entity/integration-trigger.entity'

export type ITriggerRepository = {
  debug(message: string): void
  http(type: 'body' | 'formData', data: unknown): void
  setupIntegration(trigger: IntegrationTrigger): Promise<void>
  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown>
  validateData(schema: JSONSchemaSchema, data: unknown): boolean
}
