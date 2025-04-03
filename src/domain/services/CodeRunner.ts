import type { Table } from '/domain/entities/Table'
import type { FilterConfig } from '/domain/entities/Filter'
import type { Notion, NotionCodeRunnerIntegration } from '/domain/integrations/Notion'
import type { Record, UpdateRecordFields } from '/domain/entities/Record'
import { Logger } from '/domain/services/Logger'
import type { RecordFields } from '/domain/entities/Record'
import type { Airtable, AirtableCodeRunnerIntegration } from '/domain/integrations/Airtable'
import type { Fetcher } from './Fetcher'
import type { Qonto, QontoCodeRunnerIntegration } from '../integrations/Qonto'
import type { GoCardless, GoCardlessCodeRunnerIntegration } from '../integrations/GoCardless'
import type {
  Phantombuster,
  PhantombusterCodeRunnerIntegration,
} from '../integrations/Phantombuster'
import type { Pappers, PappersCodeRunnerIntegration } from '../integrations/Pappers'
import type { NotionCodeRunnerIntegrationTable } from '../integrations/Notion/NotionTable'
import type { NotionTablePageProperties } from '../integrations/Notion/NotionTablePage'
import type { File } from '../entities/File'

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
  readFileById: (id: string) => Promise<File | undefined>
  list: (filter?: FilterConfig) => Promise<Record<T>[]>
  exists: () => Promise<boolean>
}

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
  get: (url: string, options?: RequestInit) => Promise<Response>
  post: (url: string, body: object, options?: RequestInit) => Promise<Response>
  put: (url: string, body: object, options?: RequestInit) => Promise<Response>
}

export interface CodeRunnerContextServices {
  database: CodeRunnerContextServicesDatabase
  logger: CodeRunnerContextServicesLogger
  fetcher: CodeRunnerContextServicesFetcher
}

export type CodeRunnerContextIntegrationsNotion = NotionCodeRunnerIntegration
export type CodeRunnerContextIntegrationsNotionTable<T extends NotionTablePageProperties> =
  NotionCodeRunnerIntegrationTable<T>

export interface CodeRunnerContextIntegrations {
  notion: NotionCodeRunnerIntegration
  airtable: AirtableCodeRunnerIntegration
  qonto: QontoCodeRunnerIntegration
  gocardless: GoCardlessCodeRunnerIntegration
  pappers: PappersCodeRunnerIntegration
  phantombuster: PhantombusterCodeRunnerIntegration
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
  puppeteer: typeof import('puppeteer').default
  path: typeof import('path')
  fsExtra: typeof import('fs-extra')
  slugify: typeof import('slugify').default
  sodium: typeof import('libsodium-wrappers')
  Mistral: typeof import('@mistralai/mistralai').Mistral
  ExcelJS: typeof import('exceljs')
  Stream: typeof import('stream')
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
  gocardless: GoCardless
  pappers: Pappers
  phantombuster: Phantombuster
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
