import type { Queue } from '/domain/services/Queue'
import { BaseTrigger, type BaseTriggerConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'
import type { Cron } from '/domain/services/Cron'

export interface CronTimeTickedScheduleTriggerConfig extends BaseTriggerConfig {
  automation: string
  cronTime: string
}

export interface CronTimeTickedScheduleTriggerServices {
  cron: Cron
  queue: Queue
}

export class CronTimeTickedScheduleTrigger extends BaseTrigger<CronTimeTickedScheduleTriggerConfig> {
  constructor(
    config: CronTimeTickedScheduleTriggerConfig,
    private _services: CronTimeTickedScheduleTriggerServices
  ) {
    super(config)
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { cron, queue } = this._services
    const { cronTime, automation } = this._config
    queue.job(automation, run)
    cron.start(cronTime, this.onTick)
  }

  onTick = async () => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, {
      time: new Date().toISOString(),
    })
  }
}
