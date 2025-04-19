import type { InviteeCreatedCalendlyTriggerConfig } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'

/**
 * Invitee Created Calendly Trigger
 * @title Invitee Created
 * @description A trigger that fires when an invitee is created in Calendly
 */
export interface InviteeCreatedCalendlyIntegrationTriggerAutomationSchema {
  /**
   * The integration type for this trigger
   * @title Integration
   * @description The integration type for this trigger
   */
  integration: 'Calendly'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'InviteeCreated'
  /**
   * The account identifier for this trigger
   * @title Account
   * @description The account identifier for this trigger
   */
  account: InviteeCreatedCalendlyTriggerConfig['account']
}
