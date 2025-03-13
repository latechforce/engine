import {
  AirtableTable,
  type IAirtableTableSpi,
  type UpdateAirtableTableRecord,
} from './AirtableTable'
import type { AirtableTableRecord, AirtableTableRecordFields } from './AirtableTableRecord'
import type { FilterConfig } from '/domain/entities/Filter'

export interface AirtableConfig {
  apiKey: string
  baseId: string
}

export interface IAirtableSpi {
  getConfig: () => AirtableConfig
  getTable: <T extends AirtableTableRecordFields>(id: string) => Promise<IAirtableTableSpi<T>>
}

export interface AirtableCodeRunnerIntegration {
  getTable: <T extends AirtableTableRecordFields>(
    id: string
  ) => Promise<{
    insert: (record: T) => Promise<AirtableTableRecord<T>>
    insertMany: (records: T[]) => Promise<AirtableTableRecord<T>[]>
    update: (id: string, record: Partial<T>) => Promise<AirtableTableRecord<T>>
    updateMany: (records: UpdateAirtableTableRecord<T>[]) => Promise<AirtableTableRecord<T>[]>
    delete: (id: string) => Promise<void>
    retrieve: (id: string) => Promise<AirtableTableRecord<T>>
    list: (filter?: FilterConfig) => Promise<AirtableTableRecord<T>[]>
  }>
}

export class Airtable {
  constructor(private _spi: IAirtableSpi) {}

  get codeRunnerIntegration(): AirtableCodeRunnerIntegration {
    return {
      getTable: async <T extends AirtableTableRecordFields>(id: string) => {
        const {
          insert,
          insertMany,
          update,
          updateMany,
          delete: delete_,
          retrieve,
          list,
        } = await this.getTable<T>(id)
        return {
          insert,
          insertMany,
          update,
          updateMany,
          delete: delete_,
          retrieve,
          list,
        }
      },
    }
  }

  getConfig = (): AirtableConfig => {
    return this._spi.getConfig()
  }

  getTable = async <T extends AirtableTableRecordFields>(id: string): Promise<AirtableTable<T>> => {
    const spiTable = await this._spi.getTable<T>(id)
    return new AirtableTable<T>(spiTable)
  }
}
