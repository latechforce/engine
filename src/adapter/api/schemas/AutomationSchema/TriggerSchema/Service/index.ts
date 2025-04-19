import type { DatabaseServiceTriggerAutomationSchema } from './Database'
import type { HttpServiceTriggerAutomationSchema } from './Http'
import type { ScheduleServiceTriggerAutomationSchema } from './Schedule'

/**
 * Service trigger type union
 * @title Service
 * @description Union type of all possible service triggers that can start automations
 */
export type ServiceTriggerAutomationSchema =
  | DatabaseServiceTriggerAutomationSchema
  | HttpServiceTriggerAutomationSchema
  | ScheduleServiceTriggerAutomationSchema
