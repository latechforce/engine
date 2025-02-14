import { AirtableTable, type IAirtableTableSpi } from './AirtableTable'
import type { AirtableTableRecordFields } from './AirtableTableRecord'

export interface AirtableConfig {
  apiKey: string
  baseId: string
}

export interface IAirtableSpi {
  getConfig: () => AirtableConfig
  getTable: <T extends AirtableTableRecordFields>(id: string) => Promise<IAirtableTableSpi<T>>
}

export class Airtable {
  constructor(private _spi: IAirtableSpi) {}

  getConfig = (): AirtableConfig => {
    return this._spi.getConfig()
  }

  getTable = async <T extends AirtableTableRecordFields>(id: string): Promise<AirtableTable<T>> => {
    const spiTable = await this._spi.getTable<T>(id)
    return new AirtableTable<T>(spiTable)
  }
}
