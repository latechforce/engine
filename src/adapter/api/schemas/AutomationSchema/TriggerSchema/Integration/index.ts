import type { CalendlyIntegrationTriggerAutomationSchema } from './Calendly'
import type { JotformIntegrationTriggerAutomationSchema } from './Jotform'
import type { NotionIntegrationTriggerAutomationSchema } from './Notion'
import type { YouCanBookMeIntegrationTriggerAutomationSchema } from './YouCanBookMe'

/**
 * The schema for the Integration trigger.
 * @title Integration
 * @description The Integration trigger.
 */
export type IntegrationTriggerAutomationSchema =
  | CalendlyIntegrationTriggerAutomationSchema
  | NotionIntegrationTriggerAutomationSchema
  | JotformIntegrationTriggerAutomationSchema
  | YouCanBookMeIntegrationTriggerAutomationSchema
