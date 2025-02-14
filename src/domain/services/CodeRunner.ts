import type { Table } from '/domain/entities/Table'
import type { FilterConfig } from '/domain/entities/Filter'
import type { Notion } from '/domain/integrations/Notion'
import {
  NotionTablePage,
  type NotionTablePageProperties,
} from '/domain/integrations/Notion/NotionTablePage'
import type { Record, UpdateRecordFields } from '/domain/entities/Record'
import { Logger } from '/domain/services/Logger'
import type { NotionUser } from '/domain/integrations/Notion/NotionUser'
import type { RecordFields } from '/domain/entities/Record'
import type { UpdateNotionTablePageProperties } from '/domain/integrations/Notion/NotionTable'
import type { Airtable } from '/domain/integrations/Airtable'
import type {
  AirtableTableRecord,
  AirtableTableRecordFields,
} from '/domain/integrations/Airtable/AirtableTableRecord'
import type { UpdateAirtableTableRecord } from '/domain/integrations/Airtable/AirtableTable'
import type { Fetcher } from './Fetcher'
import type {
  QontoCreateClient,
  QontoClient,
  QontoCreateClientInvoice,
  QontoClientInvoice,
  Qonto,
} from '../integrations/Qonto'

export interface ICodeRunnerSpi {
  run: (
    data: object,
    services: CodeRunnerContextServices,
    integrations: CodeRunnerContextIntegrations
  ) => Promise<object>
}

export interface CodeRunnerContextServicesDatabaseTable<T extends RecordFields = RecordFields> {
  insert: (data: T) => Promise<Record<T>>
  insertMany: (data: T[]) => Promise<Record<T>[]>
  update: (id: string, data: Partial<T>) => Promise<Record<T>>
  updateMany: (data: UpdateRecordFields<T>[]) => Promise<Record<T>[]>
  read: (filter: FilterConfig) => Promise<Record<T> | undefined>
  readById: (id: string) => Promise<Record<T> | undefined>
  list: (filter?: FilterConfig) => Promise<Record<T>[]>
  exists: () => Promise<boolean>
}

// TODO: installer Zod sur l'engine pour générer ce type à partir des schemas de la DB et avec les tables de la Database déjà typées
export interface CodeRunnerContextServicesDatabase {
  table: <T extends RecordFields = RecordFields>(
    name: string
  ) => CodeRunnerContextServicesDatabaseTable<T>
}

export interface CodeRunnerContextServicesLogger {
  error: (message: string, metadata?: object) => void
  info: (message: string, metadata?: object) => void
  debug: (message: string, metadata?: object) => void
}

export interface CodeRunnerContextServicesFetcher {
  get: (url: string) => Promise<Response>
  post: (url: string, body: object) => Promise<Response>
}

export interface CodeRunnerContextServices {
  database: CodeRunnerContextServicesDatabase
  logger: CodeRunnerContextServicesLogger
  fetcher: CodeRunnerContextServicesFetcher
}

export interface CodeRunnerContextIntegrationsNotionTable<
  T extends NotionTablePageProperties = NotionTablePageProperties,
> {
  insert: (data: T) => Promise<NotionTablePage<T>>
  insertMany: (data: T[]) => Promise<NotionTablePage<T>[]>
  update: (id: string, data: Partial<T>) => Promise<NotionTablePage<T>>
  updateMany: (data: UpdateNotionTablePageProperties<T>[]) => Promise<NotionTablePage<T>[]>
  retrieve: (id: string) => Promise<NotionTablePage<T> | undefined>
  list: (filter?: FilterConfig) => Promise<NotionTablePage<T>[]>
  archive: (id: string) => Promise<void>
}

export interface CodeRunnerContextIntegrationsNotion {
  getTable: <T extends NotionTablePageProperties = NotionTablePageProperties>(
    id: string
  ) => Promise<CodeRunnerContextIntegrationsNotionTable<T>>
  listAllUsers: () => Promise<NotionUser[]>
}

export interface CodeRunnerContextIntegrationsAirtableTable<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  insert: (data: T) => Promise<AirtableTableRecord<T>>
  insertMany: (data: T[]) => Promise<AirtableTableRecord<T>[]>
  update: (id: string, data: Partial<T>) => Promise<AirtableTableRecord<T>>
  updateMany: (data: UpdateAirtableTableRecord<T>[]) => Promise<AirtableTableRecord<T>[]>
  retrieve: (id: string) => Promise<AirtableTableRecord<T> | undefined>
  list: (filter?: FilterConfig) => Promise<AirtableTableRecord<T>[]>
  delete: (id: string) => Promise<void>
}

export interface CodeRunnerContextIntegrationsAirtable {
  getTable: <T extends AirtableTableRecordFields = AirtableTableRecordFields>(
    id: string
  ) => Promise<CodeRunnerContextIntegrationsAirtableTable<T>>
}

export interface CodeRunnerContextIntegrationsQonto {
  createClient: (client: QontoCreateClient) => Promise<QontoClient>
  createClientInvoice: (invoice: QontoCreateClientInvoice) => Promise<QontoClientInvoice>
  listClientInvoices: () => Promise<QontoClientInvoice[]>
}

export interface CodeRunnerContextIntegrations {
  notion: CodeRunnerContextIntegrationsNotion
  airtable: CodeRunnerContextIntegrationsAirtable
  qonto: CodeRunnerContextIntegrationsQonto
}

export interface CodeRunnerContextPackages {
  xml2js: typeof import('xml2js')
  dateFns: typeof import('date-fns')
  dateFnsLocale: typeof import('date-fns/locale')
  googleapis: typeof import('googleapis')
  Airtable: typeof import('airtable')
  Notion: typeof import('@notionhq/client').Client
  axios: typeof import('axios').default
  https: typeof import('https')
  crypto: typeof import('crypto')
  lodash: typeof import('lodash')
  papaparse: typeof import('papaparse')
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
  fetcher: Fetcher
}

export interface CodeRunnerEntities {
  tables: Table[]
}

export interface CodeRunnerIntegrations {
  notion: Notion
  airtable: Airtable
  qonto: Qonto
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
