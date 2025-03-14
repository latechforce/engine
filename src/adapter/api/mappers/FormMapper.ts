import type { IForm } from '/domain/interfaces/IForm'
import {
  Form,
  type FormComponents,
  type FormEntities,
  type FormServices,
} from '/domain/entities/Form'

export type FormMapperServices = FormServices

export type FormMapperEntities = FormEntities

export type FormMapperComponents = FormComponents

export class FormMapper {
  static toEntity = (
    config: IForm,
    services: FormMapperServices,
    entities: FormMapperEntities,
    components: FormMapperComponents
  ) => {
    return new Form(config, services, entities, components)
  }

  static toManyEntities = (
    configs: IForm[] = [],
    services: FormMapperServices,
    entities: FormMapperEntities,
    components: FormMapperComponents
  ) => {
    return configs.map((config) => this.toEntity(config, services, entities, components))
  }
}
