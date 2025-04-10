import {
  WebhookCalledHttpTrigger,
  type WebhookCalledHttpTriggerConfig,
  type WebhookCalledHttpTriggerServices,
} from '/domain/entities/Trigger/services/http/WebhookCalled'

export class WebhookCalledHttpTriggerMapper {
  static toEntity = (
    config: WebhookCalledHttpTriggerConfig,
    services: WebhookCalledHttpTriggerServices
  ): WebhookCalledHttpTrigger => {
    return new WebhookCalledHttpTrigger(config, services)
  }
}
