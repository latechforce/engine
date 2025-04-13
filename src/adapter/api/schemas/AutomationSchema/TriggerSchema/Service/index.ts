import type { DatabaseServiceTriggerAutomationSchema } from './Database'
import type { HttpServiceTriggerAutomationSchema } from './Http'
import type { ScheduleServiceTriggerAutomationSchema } from './Schedule'

/**
 * The schema for the Service trigger.
 * @title Service
 * @description The Service trigger.
 */
export type ServiceTriggerAutomationSchema =
  | DatabaseServiceTriggerAutomationSchema
  | HttpServiceTriggerAutomationSchema
  | ScheduleServiceTriggerAutomationSchema
