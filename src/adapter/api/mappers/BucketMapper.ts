import type { BucketSchema } from '../schemas/BucketSchema'
import type { Server } from '/domain/services/Server'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import { Bucket } from '/domain/entities/Bucket'
import type { Storage } from '/domain/services/Storage'
import type { System } from '/domain/services/System'

export interface BucketMapperServices {
  server: Server
  storage: Storage
  idGenerator: IdGenerator
  templateCompiler: TemplateCompiler
  system: System
}

export class BucketMapper {
  static toEntity = (schema: BucketSchema, services: BucketMapperServices) => {
    return new Bucket(schema, services)
  }

  static toManyEntities = (schemas: BucketSchema[] = [], services: BucketMapperServices) => {
    return schemas.map((schema) => this.toEntity(schema, services))
  }
}
