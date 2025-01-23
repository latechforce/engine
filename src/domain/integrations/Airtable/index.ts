import { AirtableTable, type IAirtableTableSpi } from './AirtableTable'

export interface AirtableConfig {
  apiKey: string
  baseId: string
}

export interface IAirtableSpi {
  getConfig: () => AirtableConfig
  getTable: (id: string) => Promise<IAirtableTableSpi>
}

export class Airtable {
  private _tables: AirtableTable[] = []

  constructor(private _spi: IAirtableSpi) {}

  getConfig = (): AirtableConfig => {
    return this._spi.getConfig()
  }

  getTable = async (id: string): Promise<AirtableTable> => {
    let table = this._tables.find((table) => table.id === id)
    if (table) return table
    const spiTable = await this._spi.getTable(id)
    table = new AirtableTable(spiTable)
    this._tables.push(table)
    return table
  }
}
