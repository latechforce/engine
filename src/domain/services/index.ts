import type { EngineError, EngineErrorCode } from '@domain/entities/EngineError'
import { Database, type DatabaseSpi } from './Database'
import { IdGenerator, type IdGeneratorSpi } from './IdGenerator'
import { Logger, type LoggerSpi } from './Logger'
import { Record } from './record'
import { SchemaValidator, type SchemaValidatorSpi } from './SchemaValidator'
import { Server, type ServerSpi } from './Server'
import { Ui, type UiSpi } from './Ui'
import type { ReactComponents } from '@domain/entities/page/component'
import { Browser, type BrowserSpi } from './Browser'

export interface Spis {
  components: ReactComponents
  server: (port?: number) => ServerSpi
  database: (url?: string) => DatabaseSpi
  logger: (location: string) => LoggerSpi
  idGenerator: () => IdGeneratorSpi
  schemaValidator: () => SchemaValidatorSpi
  ui: () => UiSpi
  browser: () => BrowserSpi
}

export class Services {
  components: ReactComponents

  constructor(private spis: Spis) {
    this.components = this.spis.components
  }

  logger = (location: string) => new Logger(this.spis.logger(location))
  idGenerator = () => new IdGenerator(this.spis.idGenerator())
  database = (url?: string) => new Database(this.spis.database(url))
  server = (port?: number) => new Server(this.spis.server(port))
  schemaValidator = (error: (code: EngineErrorCode) => EngineError) =>
    new SchemaValidator(this.spis.schemaValidator(), error)
  ui = () => new Ui(this.spis.ui())
  browser = () => new Browser(this.spis.browser())

  record = () => new Record({ idGenerator: this.idGenerator() })
}
