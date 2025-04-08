import {
  InviteeCreatedCalendlyTrigger,
  type InviteeCreatedCalendlyTriggerConfig,
  type InviteeCreatedCalendlyTriggerIntegrations,
  type InviteeCreatedCalendlyTriggerServices,
} from '/domain/entities/Trigger/calendly/InviteeCreated'

export class InviteeCreatedCalendlyTriggerMapper {
  static toEntity = (
    config: InviteeCreatedCalendlyTriggerConfig,
    services: InviteeCreatedCalendlyTriggerServices,
    integration: InviteeCreatedCalendlyTriggerIntegrations
  ): InviteeCreatedCalendlyTrigger => {
    return new InviteeCreatedCalendlyTrigger(config, services, integration)
  }
}
