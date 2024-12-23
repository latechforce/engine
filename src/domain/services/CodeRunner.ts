import type { Table } from '@domain/entities/Table'
import type { FilterConfig } from '@domain/entities/Filter'
import type { Notion } from '@domain/integrations/Notion'
import {
  NotionTablePage,
  type NotionTablePageProperties,
} from '@domain/integrations/Notion/NotionTablePage'
import type { PersistedRecord } from '@domain/entities/Record/Persisted'
import { Logger } from '@domain/services/Logger'
import type { NotionUser } from '@domain/integrations/Notion/NotionUser'

export interface ICodeRunnerSpi {
  run: (
    data: object,
    services: CodeRunnerContextServices,
    integrations: CodeRunnerContextIntegrations
  ) => Promise<object>
}

export interface CodeRunnerContextServicesDatabaseTable {
  insert: (data: unknown) => Promise<PersistedRecord>
  update: (id: string, data: unknown) => Promise<PersistedRecord>
  read: (filter: FilterConfig) => Promise<PersistedRecord | undefined>
  readById: (id: string) => Promise<PersistedRecord | undefined>
  list: (filter?: FilterConfig) => Promise<PersistedRecord[]>
}

export interface CodeRunnerContextServicesDatabase {
  table: (name: string) => CodeRunnerContextServicesDatabaseTable
}

export interface CodeRunnerContextServicesLogger {
  error: (message: string, metadata?: object) => void
  info: (message: string, metadata?: object) => void
  debug: (message: string, metadata?: object) => void
}

export interface CodeRunnerContextServices {
  database: CodeRunnerContextServicesDatabase
  logger: CodeRunnerContextServicesLogger
}

export interface CodeRunnerContextIntegrationsNotionTable {
  create: (data: NotionTablePageProperties) => Promise<NotionTablePage>
  update: (id: string, data: NotionTablePageProperties) => Promise<NotionTablePage>
  retrieve: (id: string) => Promise<NotionTablePage | undefined>
  list: (filter?: FilterConfig) => Promise<NotionTablePage[]>
  archive: (id: string) => Promise<void>
}

export interface CodeRunnerContextIntegrationsNotion {
  getTable: (id: string) => Promise<CodeRunnerContextIntegrationsNotionTable>
  listAllUsers: () => Promise<NotionUser[]>
}

export interface CodeRunnerContextIntegrations {
  notion: CodeRunnerContextIntegrationsNotion
}

export interface CodeRunnerContextPackages {
  xml2js: typeof import('xml2js')
  dateFns: typeof import('date-fns')
  googleapis: typeof import('googleapis')
  Airtable: typeof import('airtable')
  axios: typeof import('axios').default
  https: typeof import('https')
  crypto: typeof import('crypto')
  lodash: typeof import('lodash')
}

export interface CodeRunnerContext<I extends object = {}> {
  inputData: I
  env: { [key: string]: string }
  services: CodeRunnerContextServices
  integrations: CodeRunnerContextIntegrations
  packages: CodeRunnerContextPackages
}

export interface CodeRunnerServices {
  logger: Logger
}

export interface CodeRunnerEntities {
  tables: Table[]
}

export interface CodeRunnerIntegrations {
  notion: Notion
}

export class CodeRunner {
  constructor(
    private _spi: ICodeRunnerSpi,
    private _codeServices: CodeRunnerContextServices,
    private _codeIntegrations: CodeRunnerContextIntegrations
  ) {}

  run = (data: object): Promise<object> => {
    return this._spi.run(data, this._codeServices, this._codeIntegrations)
  }
}
