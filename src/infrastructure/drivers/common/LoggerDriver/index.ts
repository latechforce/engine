import type { ILoggerDriver } from '/adapter/spi/drivers/LoggerSpi'
import type { LoggersConfig } from '/domain/services/Logger'
import { ConsoleDriver } from './ConsoleDriver'
import { FileDriver } from './FileDriver'

export class LoggerDriver implements ILoggerDriver {
  private _loggers: (ConsoleDriver | FileDriver)[] = []

  constructor(config: LoggersConfig) {
    for (const logger of config) {
      const { driver } = logger
      switch (driver) {
        case 'Console':
          this._loggers.push(new ConsoleDriver(logger))
          break
        case 'File':
          this._loggers.push(new FileDriver(logger))
          break
        default:
          throw new Error('Invalid driver')
      }
    }
  }

  init = async () => {
    await Promise.all(this._loggers.map((l) => l.init()))
  }

  error: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.error(message, metadata))
  }

  warn: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.warn(message, metadata))
  }

  info: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.info(message, metadata))
  }

  http: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.http(message, metadata))
  }

  verbose: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.verbose(message, metadata))
  }

  debug: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.debug(message, metadata))
  }

  silly: (message: string, metadata: object) => void = (message, metadata) => {
    this._loggers.map((l) => l.silly(message, metadata))
  }
}
