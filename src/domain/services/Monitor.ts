import type { Logger } from './Logger'

export interface MonitorSentryConfig {
  appName: string
  appVersion: string
  driver: 'Sentry'
  dsn: string
  environment: string
}

export interface MonitorConsoleConfig {
  driver: 'Console'
}

export type MonitorConfig = MonitorSentryConfig | MonitorConsoleConfig
export type MonitorDrivers = MonitorConfig['driver'][]

export interface MonitorServices {
  logger: Logger
}

export interface IMonitorSpi {
  captureException: (error: Error) => void
  captureMessage: (message: string) => void
}

export class Monitor {
  public drivers: MonitorDrivers

  constructor(
    private _spi: IMonitorSpi,
    public config: MonitorConfig[],
    private _services: MonitorServices
  ) {
    this.drivers = config.map((c) => c.driver)
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
