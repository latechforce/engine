import type { JSONSchema7 } from 'json-schema'

export type IAutomationRepository = {
  info(message: string): void
  debug(message: string): void
  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown>
  validateTriggerData(schema: JSONSchema7, data: unknown): boolean
}
