import type { InputComponents, InputConfig } from './Input'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { Client } from '/domain/services/Client'
import type { Page as PageComponent } from '/domain/components/Page'
import type { Form as FormComponent } from '/domain/components/Form'
import type { FormResponse as FormResponseComponent } from '/domain/components/Form/FormResponse'
import type { Logger } from '/domain/services/Logger'
import type { System } from '/domain/services/System'

export interface FormConfig {
  name: string
  path: string
  title?: string
  description?: string
  table: string
  inputs: InputConfig[]
  submitLabel?: string
  successMessage?: string
}

export interface FormServices {
  server: Server
  idGenerator: IdGenerator
  client: Client
  logger: Logger
  system: System
}

export interface FormEntities {
  tables: Table[]
}

export interface FormComponents extends InputComponents {
  Page: PageComponent
  Form: FormComponent
  FormResponse: FormResponseComponent
}
