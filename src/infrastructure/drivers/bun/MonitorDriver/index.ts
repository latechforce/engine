import type { MonitorConfig } from '/domain/services/Monitor'
import type { IMonitorDriver } from '/adapter/spi/drivers/MonitorSpi'
import { SentryDriver } from './SentryDriver'
import { ConsoleDriver } from '../../common/MonitorDriver/ConsoleDriver'

export class MonitorDriver implements IMonitorDriver {
  private _monitors: (SentryDriver | ConsoleDriver)[] = []

  constructor(config: MonitorConfig[]) {
    for (const monitor of config) {
      const { driver } = monitor
      switch (driver) {
        case 'Sentry':
          this._monitors.push(new SentryDriver())
          break
        case 'Console':
          this._monitors.push(new ConsoleDriver())
          break
        default:
          throw new Error('Invalid driver')
      }
    }
  }

  captureException = (error: Error) => {
    this._monitors.map((m) => m.captureException(error))
  }

  captureMessage = (message: string) => {
    this._monitors.map((m) => m.captureMessage(message))
  }
}
