import {
  ReadRecordDatabaseAction,
  type ReadRecordDatabaseActionConfig,
  type ReadRecordDatabaseActionEntities,
  type ReadRecordDatabaseActionServices,
} from '/domain/entities/Action/services/database/ReadRecord'

export class ReadRecordDatabaseActionMapper {
  static toEntity = (
    config: ReadRecordDatabaseActionConfig,
    services: ReadRecordDatabaseActionServices,
    entities: ReadRecordDatabaseActionEntities
  ): ReadRecordDatabaseAction => {
    return new ReadRecordDatabaseAction(config, services, entities)
  }
}
