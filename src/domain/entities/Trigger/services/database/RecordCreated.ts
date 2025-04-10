import type { Record } from '/domain/entities/Record'
import type { Queue } from '/domain/services/Queue'
import type { Realtime } from '/domain/services/Realtime'
import { BaseTrigger, type BaseTriggerConfig } from '/domain/entities/Trigger/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'

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
