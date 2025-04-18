import {
  FormWebhookReceivedTrigger,
  type FormWebhookReceivedTriggerConfig,
  type FormWebhookReceivedTriggerIntegrations,
  type FormWebhookReceivedTriggerServices,
} from '../../../../domain/entities/Trigger/integrations/jotform/FormWebhookReceived'

export class FormWebhookReceivedTriggerMapper {
  static toEntity = (
    config: FormWebhookReceivedTriggerConfig,
    services: FormWebhookReceivedTriggerServices,
    integration: FormWebhookReceivedTriggerIntegrations
  ): FormWebhookReceivedTrigger => {
    return new FormWebhookReceivedTrigger(config, services, integration)
  }
}
