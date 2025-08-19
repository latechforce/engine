import type { JSONSchemaSchema } from '../../../../shared/domain/schema/json-schema.schema'
import type { IntegrationTriggerSchema } from '../../../../integrations/trigger.schema'
import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'

export type ITriggerRepository = {
  log: {
    debug(message: string): void
    http(type: 'body' | 'formData', data: unknown): void
  }
  setupIntegration(
    trigger: IntegrationTriggerSchema,
    connection: ConnectionSchema,
    automation: Automation
  ): Promise<boolean>
  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown>
  fillTriggerWithEnv(trigger: IntegrationTriggerSchema): IntegrationTriggerSchema
  validateData(schema: JSONSchemaSchema, data: unknown): boolean
  onCronTime(expression: string, timeZone: string, callback: () => Promise<void>): void
}
