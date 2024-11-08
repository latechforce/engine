interface BaseConfig {
  level?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  silent?: boolean
}

export interface ElasticSearchConfig extends BaseConfig {
  driver: 'ElasticSearch'
  url: string
  index: string
}

export interface ConsoleConfig extends BaseConfig {
  driver: 'Console'
}

export interface FileConfig extends BaseConfig {
  driver: 'File'
  filename: string
}

export type Config = (ConsoleConfig | FileConfig | ElasticSearchConfig)[]

export interface Spi {
  init: () => Promise<void>
  error: (message: string, metadata: object) => void
  warn: (message: string, metadata: object) => void
  info: (message: string, metadata: object) => void
  http: (message: string, metadata: object) => void
  verbose: (message: string, metadata: object) => void
  debug: (message: string, metadata: object) => void
  silly: (message: string, metadata: object) => void
}

export class Logger {
  constructor(
    private _spi: Spi,
    private _config: Config
  ) {}

  init: () => Promise<void> = async () => {
    await this._spi.init()
    this.debug(`init logger`)
  }

  info = (message: string, metadata: object = {}) => {
    this._spi.info(message, metadata)
  }

  error = (message: string, metadata: object = {}) => {
    this._spi.error(message, metadata)
  }

  warn = (message: string, metadata: object = {}) => {
    this._spi.warn(message, metadata)
  }

  http = (message: string, metadata: object = {}) => {
    this._spi.http(message, metadata)
  }

  verbose = (message: string, metadata: object = {}) => {
    this._spi.verbose(message, metadata)
  }

  debug = (message: string, metadata: object = {}) => {
    this._spi.debug(message, metadata)
  }

  silly = (message: string, metadata: object = {}) => {
    this._spi.silly(message, metadata)
  }
}
