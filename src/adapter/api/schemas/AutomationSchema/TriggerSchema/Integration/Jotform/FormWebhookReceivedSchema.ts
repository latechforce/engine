import type { FormWebhookReceivedTriggerConfig } from '/domain/entities/Trigger/integrations/jotform/FormWebhookReceived'

/**
 * Form Webhook Received Jotform Trigger
 * @title Form Webhook Received
 * @description A trigger that fires when form webhook is received in Jotform
 */
export interface FormWebhookReceivedJotformIntegrationTriggerAutomationSchema
  extends Omit<FormWebhookReceivedTriggerConfig, 'automation'> {
  integration: 'Jotform'
  event: 'FormWebhookReceived'
}
