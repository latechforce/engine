import type { WebhookCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/WebhookCalled'

/**
 * Webhook Called HTTP Trigger
 * @title Webhook Called
 * @description A trigger that fires when a webhook is called
 */
export interface WebhookCalledHttpServiceTriggerAutomationSchema
  extends Omit<WebhookCalledHttpTriggerConfig, 'automation' | 'description'> {
  service: 'Http'
  event: 'WebhookCalled'
}
