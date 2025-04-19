import { NotionTable, type NotionTableServices } from './NotionTable'
import { Bucket } from '/domain/entities/Bucket'
import type { Storage } from '/domain/services/Storage'
import type { Server } from '/domain/services/Server'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { NotionUser } from './NotionUser'
import type { NotionTablePageProperties } from './NotionTypes'
import type { System } from '/domain/services/System'
import type { INotionSpi } from './INotionSpi'
import { Integration } from '../base'
import type { NotionCodeRunner } from './NotionCodeRunner'
import type { NotionConfig } from './NotionConfig'

export interface NotionServices extends NotionTableServices {
  storage: Storage
  server: Server
  templateCompiler: TemplateCompiler
  system: System
}

export class Notion extends Integration<NotionConfig, INotionSpi> {
  private _bucket?: Bucket
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _tables = new Map<string, NotionTable<any>>()

  constructor(
    spis: INotionSpi[],
    private _notionsServices: NotionServices
  ) {
    super('notion', spis, _notionsServices)
  }

  get codeRunnerIntegration(): NotionCodeRunner {
    return {
      getTable: async <T extends NotionTablePageProperties>(account: string, id: string) => {
        const table = await this.getTable<T>(account, id)
        return table.codeRunnerIntegration
      },
      listAllUsers: async (account: string) => {
        return this.listAllUsers(account)
      },
    }
  }

  init = async () => {
    await super.init()
    const name = 'notion_files'
    this._bucket = new Bucket({ name }, this._notionsServices)
    await this._bucket.init()
  }

  startPolling = async () => {
    this._tables.forEach((table) => table.startPolling())
  }

  stopPolling = async () => {
    this._tables.forEach((table) => table.stopPolling())
  }

  getTable = async <T extends NotionTablePageProperties>(
    account: string,
    id: string
  ): Promise<NotionTable<T>> => {
    if (this._tables.has(id)) return this._tables.get(id) as NotionTable<T>
    const spiTable = await this._spi(account).getTable<T>(id)
    if (!this._bucket) throw new Error('bucket not initialized')
    const newTable = new NotionTable<T>(
      spiTable,
      this._notionsServices,
      this._config(account),
      this._bucket
    )
    this._tables.set(id, newTable)
    return newTable
  }

  listAllUsers = async (account: string): Promise<NotionUser[]> => {
    const response = await this._spi(account).listAllUsers()
    if (response.error) return Integration.throwError('listAllUsers', response.error)
    return response.data
  }
}
