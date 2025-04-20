import { Table, type TableConfig } from '/domain/entities/Table'
import type { TableSchema } from '../schemas/TableSchema'
import { FieldMapper } from './FieldMapper'
import type { Server } from '/domain/services/Server'
import type { Database } from '/domain/services/Database'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { SchemaValidator } from '/domain/services/SchemaValidator'
import type { Monitor } from '/domain/services/Monitor'
import type { Storage } from '/domain/services/Storage'
import type { System } from '/domain/services/System'

export interface TableMapperServices {
  server: Server
  database: Database
  idGenerator: IdGenerator
  templateCompiler: TemplateCompiler
  schemaValidator: SchemaValidator
  monitor: Monitor
  storage: Storage
  system: System
}

export class TableMapper {
  static toEntity = (schema: TableSchema, services: TableMapperServices): Table => {
    const { name } = schema
    const {
      server,
      database,
      idGenerator,
      templateCompiler,
      schemaValidator,
      monitor,
      storage,
      system,
    } = services
    const fields = FieldMapper.toManyEntities(schema.fields)
    return new Table(
      {
        name,
        schema: schema.schema,
        fields: FieldMapper.toManyConfigs(schema.fields),
      },
      {
        server,
        database,
        idGenerator,
        templateCompiler,
        schemaValidator,
        monitor,
        storage,
        system,
      },
      { fields }
    )
  }

  static toConfig = (schema: TableSchema): TableConfig => {
    return {
      name: schema.name,
      schema: schema.schema,
      fields: FieldMapper.toManyConfigs(schema.fields),
    }
  }

  static toManyEntities = (schemas: TableSchema[] = [], services: TableMapperServices): Table[] => {
    return schemas.map((schema) => this.toEntity(schema, services))
  }

  static toManyConfigs = (schemas: TableSchema[] = []): TableConfig[] => {
    return schemas.map((schema) => this.toConfig(schema))
  }
}
