import type { NotionTableSpi } from '/adapter/spi/integrations/NotionTableSpi'
import { NotionTable, type NotionTableServices } from './NotionTable'
import { Bucket } from '/domain/entities/Bucket'
import type { Storage } from '/domain/services/Storage'
import type { Server } from '/domain/services/Server'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { NotionUser } from './NotionUser'
import type { NotionTablePageProperties } from './NotionTablePage'

export interface NotionConfig {
  token: string
  pollingInterval?: number
}

export interface NotionServices extends NotionTableServices {
  storage: Storage
  server: Server
  templateCompiler: TemplateCompiler
}

export interface INotionSpi {
  getConfig: () => NotionConfig
  getTable: <T extends NotionTablePageProperties>(id: string) => Promise<NotionTableSpi<T>>
  listAllUsers: () => Promise<NotionUser[]>
}

export class Notion {
  private _bucket?: Bucket
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _tables = new Map<string, NotionTable<any>>()

  constructor(
    private _spi: INotionSpi,
    private _services: NotionServices
  ) {}

  getConfig = (): NotionConfig => {
    return this._spi.getConfig()
  }

  init = async () => {
    const name = 'notion_files'
    this._bucket = new Bucket({ name }, this._services)
    await this._bucket.init()
  }

  startPolling = async () => {
    this._tables.forEach((table) => table.startPolling())
  }

  stopPolling = async () => {
    this._tables.forEach((table) => table.stopPolling())
  }

  getTable = async <T extends NotionTablePageProperties>(id: string): Promise<NotionTable<T>> => {
    if (this._tables.has(id)) return this._tables.get(id) as NotionTable<T>
    const spiTable = await this._spi.getTable<T>(id)
    if (!this._bucket) throw new Error('bucket not initialized')
    const newTable = new NotionTable<T>(spiTable, this._services, this.getConfig(), this._bucket)
    this._tables.set(id, newTable)
    return newTable
  }

  listAllUsers = async (): Promise<NotionUser[]> => {
    return this._spi.listAllUsers()
  }
}
