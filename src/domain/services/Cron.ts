export interface ICronSpi {
  start(cronTime: string, onTick: () => void): string
  stop(id: string): void
}

export class Cron {
  private _jobs: string[] = []

  constructor(private _cronSpi: ICronSpi) {}

  start(cronTime: string, onTick: () => void) {
    const id = this._cronSpi.start(cronTime, onTick)
    this._jobs.push(id)
  }

  stopAll(): void {
    this._jobs.forEach((id) => this._cronSpi.stop(id))
  }
}
