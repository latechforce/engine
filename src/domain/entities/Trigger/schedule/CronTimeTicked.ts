import type { Queue } from '/domain/services/Queue'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { Cron } from '/domain/services/Cron'

export interface CronTimeTickedScheduleTriggerConfig extends BaseTriggerConfig {
  automation: string
  cronTime: string
}

export interface CronTimeTickedScheduleTriggerServices {
  cron: Cron
  queue: Queue
}

export class CronTimeTickedScheduleTrigger implements BaseTrigger {
  constructor(
    private _config: CronTimeTickedScheduleTriggerConfig,
    private _services: CronTimeTickedScheduleTriggerServices
  ) {}

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { cron, queue } = this._services
    const { cronTime, automation } = this._config
    queue.job(automation, run)
    cron.start(cronTime, this.onTick)
  }

  validateConfig = async () => {
    return []
  }

  onTick = async () => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, {
      time: new Date().toISOString(),
    })
  }
}
