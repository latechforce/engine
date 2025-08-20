import type { JSONSchemaSchema } from '../../../../shared/domain/schema/json-schema.schema'
import type { IntegrationTriggerSchema } from '../../../../shared/integrations/core/trigger.schema'
import type { ConnectionSchema } from '../../../../shared/integrations/core/connection.schema'
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
  ): Promise<undefined | { error: string }>
  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown>
  fillTriggerWithEnv(trigger: IntegrationTriggerSchema): IntegrationTriggerSchema
  validateData(schema: JSONSchemaSchema, data: unknown): boolean
  onCronTime(expression: string, timeZone: string, callback: () => Promise<void>): void
}
