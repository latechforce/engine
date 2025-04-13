import type { ApiCalledHttpServiceTriggerAutomationSchema } from './ApiCalledSchema'
import type { WebhookCalledHttpServiceTriggerAutomationSchema } from './WebhookCalledSchema'

/**
 * The schema for the Http service trigger.
 * @title Http
 * @description The Http service trigger.
 */
export type HttpServiceTriggerAutomationSchema =
  | ApiCalledHttpServiceTriggerAutomationSchema
  | WebhookCalledHttpServiceTriggerAutomationSchema
