import type { Logger } from '/domain/services/Logger'
import type { Server } from '/domain/services/Server'
import type { Database } from '/domain/services/Database'
import type { Table } from '../Table/'
import type { Bucket } from '../Bucket'
import type { Automation } from '../Automation'
import type { Queue } from '/domain/services/Queue'
import type { Realtime } from '/domain/services/Realtime'
import type { Storage } from '/domain/services/Storage'
import type { Monitor } from '/domain/services/Monitor'
import type { CodeCompiler } from '/domain/services/CodeCompiler'
import type { IntegrationsConfig, Integrations } from '/domain/integrations'
import type { Cron } from '/domain/services/Cron'
import type { Form } from '../Form'
import type { Theme } from '/domain/services/Theme'
import type { ServicesConfig } from '/domain/services'
import type { Admin } from '../Admin'

export interface AppConfig {
  name: string
  appVersion: string
  engineVersion: string
  description?: string
  integrations?: IntegrationsConfig
  services?: ServicesConfig
}

export interface AppServices {
  logger: Logger
  server: Server
  database: Database
  queue: Queue
  realtime: Realtime
  storage: Storage
  monitor: Monitor
  codeCompiler: CodeCompiler
  cron: Cron
  theme: Theme
}

export interface AppEntities {
  tables: Table[]
  automations: Automation[]
  buckets: Bucket[]
  forms: Form[]
  admin: Admin
}

type Status = 'stopped' | 'starting' | 'started' | 'stopping'

export class BaseApp {
  public logger: Logger
  protected _status: Status = 'stopped'

  constructor(
    public config: AppConfig,
    protected _services: AppServices,
    protected _entities: AppEntities,
    protected _integrations: Integrations
  ) {
    this.logger = _services.logger
  }

  getTable = (name: string): Table => {
    const table = this._entities.tables.find((table) => table.name === name)
    if (!table) throw new Error(`table "${name}" not found`)
    return table
  }

  protected _setStatus = (status: Status) => {
    this.logger.debug(`set app status: ${status}`)
    this._status = status
  }
}
