import type { WebinarParticipantJoinedTriggerConfig } from '/domain/entities/Trigger/integrations/zoom/WebinarParticipantJoined'

export interface WebinarParticipantJoinedZoomIntegrationTriggerAutomationSchema {
  /**
   * The integration type for this trigger
   * @title Integration
   * @description The integration type for this trigger
   */
  integration: 'Zoom'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'WebinarParticipantJoinedTrigger'
  /**
   * The account identifier for this trigger
   * @title Account
   * @description The account identifier for this trigger
   */
  account: WebinarParticipantJoinedTriggerConfig['account']
}
