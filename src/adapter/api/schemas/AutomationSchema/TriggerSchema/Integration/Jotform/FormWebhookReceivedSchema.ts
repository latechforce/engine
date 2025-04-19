import type { FormWebhookReceivedTriggerConfig } from '/domain/entities/Trigger/integrations/jotform/FormWebhookReceived'

/**
 * Form Webhook Received Jotform Trigger
 * @title Form Webhook Received
 * @description A trigger that fires when form webhook is received in Jotform
 */
export interface FormWebhookReceivedJotformIntegrationTriggerAutomationSchema {
  /**
   * The integration type for this trigger
   * @title Integration
   * @description The integration type for this trigger
   */
  integration: 'Jotform'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'FormWebhookReceived'
  /**
   * The form identifier for this trigger
   * @title Form
   * @description The form identifier for this trigger
   */
  formId: FormWebhookReceivedTriggerConfig['formId']
  /**
   * The account identifier for this trigger
   * @title Account
   * @description The account identifier for this trigger
   */
  account: FormWebhookReceivedTriggerConfig['account']
}
