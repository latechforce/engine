import type { InputComponents, InputConfig } from './Input'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table/'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { Client } from '/domain/services/Client'
import type { Page as PageComponent } from '../../components/Layouts/Page'
import type { Form as FormComponent } from '../../components/Layouts/Form'
import type { FormResponse as FormResponseComponent } from '../../components/Layouts/FormResponse'
import type { Logger } from '/domain/services/Logger'
import type { System } from '/domain/services/System'
import type { Theme } from '/domain/services/Theme'

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
  theme: Theme
}

export interface FormEntities {
  tables: Table[]
}

export interface FormComponents extends InputComponents {
  Page: PageComponent
  Form: FormComponent
  FormResponse: FormResponseComponent
}
