import type { InviteeCreatedCalendlyTriggerConfig } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'

/**
 * Invitee Created Calendly Trigger
 * @title Invitee Created
 * @description A trigger that fires when an invitee is created in Calendly
 */
export interface InviteeCreatedCalendlyIntegrationTriggerAutomationSchema
  extends Omit<InviteeCreatedCalendlyTriggerConfig, 'automation'> {
  integration: 'Calendly'
  event: 'InviteeCreated'
}
