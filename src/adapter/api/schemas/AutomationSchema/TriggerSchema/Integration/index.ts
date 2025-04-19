import type { CalendlyIntegrationTriggerAutomationSchema } from './Calendly'
import type { JotformIntegrationTriggerAutomationSchema } from './Jotform'
import type { NotionIntegrationTriggerAutomationSchema } from './Notion'
import type { YouCanBookMeIntegrationTriggerAutomationSchema } from './YouCanBookMe'

/**
 * Integration trigger type union
 * @title Integration
 * @description Union type of all possible integration triggers that can start automations
 */
export type IntegrationTriggerAutomationSchema =
  | CalendlyIntegrationTriggerAutomationSchema
  | NotionIntegrationTriggerAutomationSchema
  | JotformIntegrationTriggerAutomationSchema
  | YouCanBookMeIntegrationTriggerAutomationSchema
