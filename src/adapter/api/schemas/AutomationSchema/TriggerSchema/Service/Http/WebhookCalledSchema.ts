import type { WebhookCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/WebhookCalled'

/**
 * Webhook Called HTTP Trigger
 * @title Webhook Called
 * @description A trigger that fires when a webhook is called
 */
export interface WebhookCalledHttpServiceTriggerAutomationSchema {
  /**
   * The service type for this trigger
   * @title Service
   * @description The service type for this trigger
   */
  service: 'Http'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'WebhookCalled'
  /**
   * The path for this trigger
   * @title Path
   * @description The path for this trigger
   */
  path: WebhookCalledHttpTriggerConfig['path']
  /**
   * The authentication configuration for this trigger
   * @title Authentication
   * @description The authentication configuration for this trigger
   */
  auth?: WebhookCalledHttpTriggerConfig['auth']
}
