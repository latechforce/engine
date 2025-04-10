import {
  RecordCreatedDatabaseTrigger,
  type RecordCreatedDatabaseTriggerConfig,
  type RecordCreatedDatabaseTriggerServices,
} from '/domain/entities/Trigger/services/database/RecordCreated'

export class RecordCreatedDatabaseTriggerMapper {
  static toEntity = (
    config: RecordCreatedDatabaseTriggerConfig,
    services: RecordCreatedDatabaseTriggerServices
  ): RecordCreatedDatabaseTrigger => {
    return new RecordCreatedDatabaseTrigger(config, services)
  }
}
