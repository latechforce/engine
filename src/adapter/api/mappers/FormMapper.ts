import type { IForm } from '/domain/interfaces/IForm'
import type { Server } from '/domain/services/Server'
import { Form } from '/domain/entities/Form'
import type { Table } from '/domain/entities/Table'

export interface FormMapperServices {
  server: Server
}

export interface FormMapperEntities {
  tables: Table[]
}

export class FormMapper {
  static toEntity = (config: IForm, services: FormMapperServices, entities: FormMapperEntities) => {
    return new Form(config, services, entities)
  }

  static toManyEntities = (
    configs: IForm[] = [],
    services: FormMapperServices,
    entities: FormMapperEntities
  ) => {
    return configs.map((config) => this.toEntity(config, services, entities))
  }
}
