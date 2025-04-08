import {
  BookingCreatedTrigger,
  type BookingCreatedTriggerConfig,
  type BookingCreatedTriggerIntegrations,
  type BookingCreatedTriggerServices,
} from '/domain/entities/Trigger/youCanBookMe/BookingCreated'

export class BookingCreatedTriggerMapper {
  static toEntity = (
    config: BookingCreatedTriggerConfig,
    services: BookingCreatedTriggerServices,
    integration: BookingCreatedTriggerIntegrations
  ): BookingCreatedTrigger => {
    return new BookingCreatedTrigger(config, services, integration)
  }
}
