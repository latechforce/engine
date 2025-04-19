import type { ServiceTriggerAutomationSchema } from './Service'
import type { IntegrationTriggerAutomationSchema } from './Integration'

/**
 * Trigger type union
 * @title Trigger
 * @description Union type of all possible triggers that can start automations
 */
export type TriggerAutomationSchema =
  | ServiceTriggerAutomationSchema
  | IntegrationTriggerAutomationSchema
