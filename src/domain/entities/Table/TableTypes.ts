import type { Server } from '/domain/services/Server'
import type { Database } from '/domain/services/Database'
import type { Storage } from '/domain/services/Storage'
import type { Field } from '../Field'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import { IdGenerator } from '/domain/services/IdGenerator'
import type { SchemaValidator } from '/domain/services/SchemaValidator'
import type { Monitor } from '/domain/services/Monitor'
import type { System } from '/domain/services/System'

export interface TableConfig {
  name: string
}

export interface TableServices {
  server: Server
  database: Database
  idGenerator: IdGenerator
  templateCompiler: TemplateCompiler
  schemaValidator: SchemaValidator
  monitor: Monitor
  storage: Storage
  system: System
}

export interface TableEntites {
  fields: Field[]
}
