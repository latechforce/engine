import type { ApiCalledHttpTriggerSchema } from './services/http/ApiCalledSchema'
import type { RecordCreatedDatabaseTriggerSchema } from './services/database/RecordCreatedSchema'
import type { WebhookCalledHttpTriggerSchema } from './services/http/WebhookCalledSchema'
import type { TablePageCreatedNotionTriggerSchema } from './integrations/notion/TablePageCreatedSchema'
import type { CronTimeTickedScheduleTriggerSchema } from './services/schedule/CronTimeTickedSchema'
import type { InviteeCreatedTriggerSchema } from './integrations/calendly/InviteeCreatedSchema'

/**
 * Trigger type union
 * @title Trigger
 * @description Union type of all possible triggers that can start automations
 * @example
 * // HTTP API trigger example
 * {
 *   service: 'Http',
 *   trigger: 'ApiCalled',
 *   method: 'POST',
 *   path: '/api/webhook',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   }
 * }
 * @example
 * // Database trigger example
 * {
 *   service: 'Database',
 *   trigger: 'RecordCreated',
 *   table: 'users',
 *   conditions: {
 *     status: 'active'
 *   }
 * }
 * @example
 * // Schedule trigger example
 * {
 *   service: 'Schedule',
 *   trigger: 'CronTimeTicked',
 *   cron: '0 9 * * *' // Every day at 9 AM
 * }
 */
export type TriggerSchema =
  | ApiCalledHttpTriggerSchema
  | RecordCreatedDatabaseTriggerSchema
  | WebhookCalledHttpTriggerSchema
  | TablePageCreatedNotionTriggerSchema
  | CronTimeTickedScheduleTriggerSchema
  | InviteeCreatedTriggerSchema
