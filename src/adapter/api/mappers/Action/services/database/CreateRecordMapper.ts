import type { ICreateRecordDatabaseAction } from '/domain/interfaces/IAction/services/database/ICreateRecord'
import {
  CreateRecordDatabaseAction,
  type CreateRecordDatabaseActionServices,
  type CreateRecordDatabaseActionEntities,
} from '/domain/entities/Action/services/database/CreateRecord'

export type CreateRecordDatabaseActionMapperServices = CreateRecordDatabaseActionServices

export type CreateRecordDatabaseActionMapperEntities = CreateRecordDatabaseActionEntities

export class CreateRecordDatabaseActionMapper {
  static toEntity = (
    config: ICreateRecordDatabaseAction,
    services: CreateRecordDatabaseActionMapperServices,
    entities: CreateRecordDatabaseActionMapperEntities
  ): CreateRecordDatabaseAction => {
    return new CreateRecordDatabaseAction(config, services, entities)
  }
}
