import type { BookingCreatedTriggerConfig } from '../../../../../../../domain/entities/Trigger/integrations/youcanbookme/BookingCreated'

/**
 * Booking Created YouCanBookMe Trigger
 * @title Booking Created
 * @description A trigger that fires when a booking is created in YouCanBookMe
 */
export interface BookingCreatedYouCanBookMeIntegrationTriggerAutomationSchema
  extends Omit<BookingCreatedTriggerConfig, 'automation'> {
  integration: 'YouCanBookMe'
  event: 'BookingCreated'
}
