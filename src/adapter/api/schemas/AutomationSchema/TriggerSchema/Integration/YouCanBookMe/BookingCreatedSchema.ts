import type { BookingCreatedTriggerConfig } from '/domain/entities/Trigger/integrations/youcanbookme/BookingCreated'

/**
 * Booking Created YouCanBookMe Trigger
 * @title Booking Created
 * @description A trigger that fires when a booking is created in YouCanBookMe
 */
export interface BookingCreatedYouCanBookMeIntegrationTriggerAutomationSchema {
  /**
   * The integration type for this trigger
   * @title Integration
   * @description The integration type for this trigger
   */
  integration: 'YouCanBookMe'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'BookingCreated'
  /**
   * The account identifier for this trigger
   * @title Account
   * @description The account identifier for this trigger
   */
  account: BookingCreatedTriggerConfig['account']
}
