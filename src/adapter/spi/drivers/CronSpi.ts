import type { ICronSpi } from '/domain/services/Cron'

export interface ICronDriver {
  start(cronTime: string, onTick: () => void): string
  stop(id: string): void
}

export class CronSpi implements ICronSpi {
  constructor(private _cronDriver: ICronDriver) {}

  start(cronTime: string, onTick: () => void): string {
    return this._cronDriver.start(cronTime, onTick)
  }

  stop(id: string): void {
    this._cronDriver.stop(id)
  }
}
