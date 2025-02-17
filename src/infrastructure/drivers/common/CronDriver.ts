import { CronJob } from 'cron'
import { nanoid } from 'nanoid'
import type { ICronDriver } from '/adapter/spi/drivers/CronSpi'

export class CronDriver implements ICronDriver {
  private _jobs = new Map<string, CronJob>()

  start(cronTime: string, onTick: () => void): string {
    const id = nanoid()
    const job = new CronJob(cronTime, onTick, null, true, 'Europe/Paris')
    this._jobs.set(id, job)
    return id
  }

  stop(id: string): void {
    const job = this._jobs.get(id)
    if (job) {
      job.stop()
      this._jobs.delete(id)
    }
  }
}
