import type { IApiCalledHttpTrigger } from './services/http/IApiCalled'
import type { IRecordCreatedDatabaseTrigger } from './services/database/IRecordCreated'
import type { IWebhookCalledHttpTrigger } from './services/http/IWebhookCalled'
import type { IPageCreatedNotionTrigger } from './integrations/notion/ITablePageCreated'
import type { ICronTimeTickedScheduleTrigger } from './services/schedule/ICronTimeTicked'
import type { IInviteeCreatedTrigger } from './integrations/calendly/IInviteeCreated'

/**
 * Trigger type union
 * @title Trigger types
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
export type ITrigger =
  | IApiCalledHttpTrigger
  | IRecordCreatedDatabaseTrigger
  | IWebhookCalledHttpTrigger
  | IPageCreatedNotionTrigger
  | ICronTimeTickedScheduleTrigger
  | IInviteeCreatedTrigger
