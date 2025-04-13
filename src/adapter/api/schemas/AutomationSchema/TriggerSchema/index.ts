import type { ApiCalledHttpServiceTriggerAutomationSchema } from './Service/Http/ApiCalledSchema'
import type { RecordCreatedDatabaseServiceTriggerAutomationSchema } from './Service/Database/RecordCreatedSchema'
import type { WebhookCalledHttpServiceTriggerAutomationSchema } from './Service/Http/WebhookCalledSchema'
import type { TablePageCreatedNotionIntegrationTriggerAutomationSchema } from './Integration/Notion/TablePageCreatedSchema'
import type { CronTimeTickedScheduleServiceTriggerAutomationSchema } from './Service/Schedule/CronTimeTickedSchema'
import type { InviteeCreatedCalendlyIntegrationTriggerAutomationSchema } from './Integration/Calendly/InviteeCreatedSchema'

/**
 * Trigger type union
 * @title Trigger
 * @description Union type of all possible triggers that can start automations
 * @example
 * {
 *   service: 'Http',
 *   trigger: 'ApiCalled',
 *   path: '/run-automation',
 * }
 */
export type TriggerAutomationSchema =
  | ApiCalledHttpServiceTriggerAutomationSchema
  | RecordCreatedDatabaseServiceTriggerAutomationSchema
  | WebhookCalledHttpServiceTriggerAutomationSchema
  | TablePageCreatedNotionIntegrationTriggerAutomationSchema
  | CronTimeTickedScheduleServiceTriggerAutomationSchema
  | InviteeCreatedCalendlyIntegrationTriggerAutomationSchema
