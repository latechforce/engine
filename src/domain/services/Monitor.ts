import type { Logger } from './Logger'

export interface MonitorSentryConfig {
  appName: string
  appVersion: string
  type: 'Sentry'
  dsn: string
  environment: string
}

export interface MonitorConsoleConfig {
  type: 'Console'
}

export type MonitorConfig = MonitorSentryConfig | MonitorConsoleConfig
export type MonitorType = MonitorConfig['type']

export interface MonitorServices {
  logger: Logger
}

export interface IMonitorSpi {
  captureException: (error: Error) => void
  captureMessage: (message: string) => void
}

export class Monitor {
  public types: MonitorType[]

  constructor(
    private _spi: IMonitorSpi,
    public config: MonitorConfig[],
    private _services: MonitorServices
  ) {
    this.types = config.map((c) => c.type)
  }

  captureException = (error: Error) => {
    this._services.logger.error(error.message)
    this._spi.captureException(error)
  }

  captureMessage = (message: string) => {
    this._services.logger.error(message)
    this._spi.captureMessage(message)
  }
}
