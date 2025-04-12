import type { FormSchema } from '../schemas/FormSchema'
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
    schema: FormSchema,
    services: FormMapperServices,
    entities: FormMapperEntities,
    components: FormMapperComponents
  ) => {
    return new Form(schema, services, entities, components)
  }

  static toManyEntities = (
    schemas: FormSchema[] = [],
    services: FormMapperServices,
    entities: FormMapperEntities,
    components: FormMapperComponents
  ) => {
    return schemas.map((schema) => this.toEntity(schema, services, entities, components))
  }
}
