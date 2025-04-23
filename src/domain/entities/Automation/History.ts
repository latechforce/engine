import type { Database } from '/domain/services/Database'
import type { DatabaseTable, ListParams } from '/domain/services/DatabaseTable'
import { SingleLineTextField } from '../Field/SingleLineText'
import { LongTextField } from '../Field/LongText'
import type { Field } from '../Field'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { RecordFields } from '../Record'
import type { Record } from '/domain/entities/Record'
import type { Filter } from '../Filter'
import type { CountParams } from '/adapter/spi/drivers/DatabaseTableSpi'

export interface AutomationHistoryRecord extends RecordFields {
  automation_name: string
  trigger_data: string
  actions_data: string
  status: string
}

export interface AutomationHistoryRecordReadModel {
  id: string
  created_at: Date
  updated_at: Date
  automation_name: string
  trigger_data: string
  actions_data: string
  status: string
}

export interface AutomationHistoryServices {
  database: Database
  idGenerator: IdGenerator
}

export class AutomationHistory {
  private _table: DatabaseTable
  private _fields: Field[] = [
    new SingleLineTextField({ name: 'automation_name', required: true }),
    new LongTextField({ name: 'trigger_data' }),
    new LongTextField({ name: 'actions_data' }),
    new SingleLineTextField({ name: 'status', required: true }),
  ]

  constructor(private _services: AutomationHistoryServices) {
    this._table = this._services.database.table({
      name: 'histories',
      schema: 'automations',
      fields: this._fields.map((field) => field.config),
    })
  }

  init = async () => {
    await this._table.dropView()
    const exists = await this._table.exists()
    if (exists) {
      await this._table.migrate()
    } else {
      await this._table.create()
    }
    await this._table.createView()
  }

  create = async (history: AutomationHistoryRecord): Promise<string> => {
    const record = await this._table.insert(history)
    return record.id
  }

  updateActions = async (id: string, actions: object): Promise<void> => {
    await this._table.update(id, {
      actions_data: JSON.stringify(actions),
    })
  }

  updateStatus = async (id: string, status: string): Promise<void> => {
    await this._table.update(id, { status })
  }

  list = async (params: ListParams): Promise<AutomationHistoryRecordReadModel[]> => {
    const records = await this._table.list<AutomationHistoryRecord>(params)
    return records.map(
      (record: Record<AutomationHistoryRecord>): AutomationHistoryRecordReadModel => {
        return {
          id: record.id,
          created_at: record.created_at,
          updated_at: record.updated_at,
          automation_name: record.fields.automation_name,
          trigger_data: record.fields.trigger_data,
          actions_data: record.fields.actions_data,
          status: record.fields.status,
        }
      }
    )
  }

  count = async (params: CountParams): Promise<number> => {
    return await this._table.count(params)
  }
}
