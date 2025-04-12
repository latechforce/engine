import type { WebhookCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/WebhookCalled'

export interface WebhookCalledHttpTriggerSchema
  extends Omit<WebhookCalledHttpTriggerConfig, 'automation' | 'summary' | 'description'> {
  service: 'Http'
  event: 'WebhookCalled'
}
