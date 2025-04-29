import type { Record } from '../../../Record'
import type { Queue } from '../../../../services/Queue'
import type { Realtime } from '../../../../services/Realtime'
import { BaseTrigger, type BaseTriggerConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'

export interface RecordCreatedDatabaseTriggerConfig extends BaseTriggerConfig {
  table: string
}

export interface RecordCreatedDatabaseTriggerServices {
  realtime: Realtime
  queue: Queue
}

export class RecordCreatedDatabaseTrigger extends BaseTrigger<RecordCreatedDatabaseTriggerConfig> {
  constructor(
    config: RecordCreatedDatabaseTriggerConfig,
    private _services: RecordCreatedDatabaseTriggerServices
  ) {
    super(config)
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { realtime, queue } = this._services
    const { table, automation } = this._config
    queue.job(automation, run)
    realtime.onInsert(table, this.onInsert)
  }

  onInsert = async (record: Record) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, record.toJson())
  }
}
