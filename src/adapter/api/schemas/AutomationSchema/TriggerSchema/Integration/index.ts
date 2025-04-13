import type { CalendlyIntegrationTriggerAutomationSchema } from './Calendly'
import type { NotionIntegrationTriggerAutomationSchema } from './Notion'

/**
 * The schema for the Integration trigger.
 * @title Integration
 * @description The Integration trigger.
 */
export type IntegrationTriggerAutomationSchema =
  | CalendlyIntegrationTriggerAutomationSchema
  | NotionIntegrationTriggerAutomationSchema
