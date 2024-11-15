import type { PersistedRecord } from '@domain/entities/Record/Persisted'
import type { Queue } from '@domain/services/Queue'
import type { Realtime } from '@domain/services/Realtime'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'

export interface RecordCreatedDatabaseTriggerConfig extends BaseTriggerConfig {
  automation: string
  table: string
}

export interface RecordCreatedDatabaseTriggerServices {
  realtime: Realtime
  queue: Queue
}

export class RecordCreatedDatabaseTrigger implements BaseTrigger {
  constructor(
    private _config: RecordCreatedDatabaseTriggerConfig,
    private _services: RecordCreatedDatabaseTriggerServices
  ) {}

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { realtime, queue } = this._services
    const { table, automation } = this._config
    queue.job(automation, run)
    realtime.onInsert(table, this.onInsert)
  }

  onInsert = async (record: PersistedRecord) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, record.toJson())
  }
}
