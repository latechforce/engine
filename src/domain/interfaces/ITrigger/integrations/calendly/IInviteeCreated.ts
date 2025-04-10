import type { InviteeCreatedCalendlyTriggerConfig } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'

export interface IInviteeCreatedTrigger
  extends Omit<InviteeCreatedCalendlyTriggerConfig, 'automation'> {
  integration: 'Calendly'
  event: 'InviteeCreated'
}
