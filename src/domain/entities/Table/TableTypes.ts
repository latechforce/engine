import type { Server } from '../../services/Server'
import type { Database } from '../../services/Database'
import type { Storage } from '../../services/Storage'
import type { Field, FieldConfig } from '../Field'
import type { TemplateCompiler } from '../../services/TemplateCompiler'
import { IdGenerator } from '../../services/IdGenerator'
import type { SchemaValidator } from '../../services/SchemaValidator'
import type { Monitor } from '../../services/Monitor'
import type { System } from '../../services/System'

export interface TableConfig {
  name: string
  schema?: string
  fields: FieldConfig[]
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
