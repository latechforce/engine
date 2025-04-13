import type { WebhookCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/WebhookCalled'

/**
 * Webhook Called HTTP Trigger
 * @title Webhook Called
 * @description A trigger that fires when a webhook is called
 */
export interface WebhookCalledHttpTriggerSchema
  extends Omit<WebhookCalledHttpTriggerConfig, 'automation' | 'summary' | 'description'> {
  service: 'Http'
  event: 'WebhookCalled'
}
