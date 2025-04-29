import type { Logger } from '../../services/Logger'
import type { Server } from '../../services/Server'
import type { Database } from '../../services/Database'
import type { Table } from '../Table'
import type { Bucket } from '../Bucket'
import type { Automation } from '../Automation'
import type { Queue } from '../../services/Queue'
import type { Realtime } from '../../services/Realtime'
import type { Storage } from '../../services/Storage'
import type { Monitor } from '../../services/Monitor'
import type { CodeCompiler } from '../../services/CodeCompiler'
import type { IntegrationsConfig, Integrations } from '../../integrations'
import type { Cron } from '../../services/Cron'
import type { Form } from '../Form'
import type { Theme } from '../../services/Theme'
import type { ServicesConfig } from '../../services'
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
