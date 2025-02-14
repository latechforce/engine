import {
  AirtableTableSpi,
  type IAirtableTableIntegration,
} from '/adapter/spi/integrations/AirtableTableSpi'
import type { IAirtableSpi, AirtableConfig } from '/domain/integrations/Airtable'
import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTableRecord'

export interface IAirtableIntegration {
  getConfig: () => AirtableConfig
  getTable: <T extends AirtableTableRecordFields>(
    id: string
  ) => Promise<IAirtableTableIntegration<T>>
}

export class AirtableSpi implements IAirtableSpi {
  constructor(private _integration: IAirtableIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  getTable = async <T extends AirtableTableRecordFields>(id: string) => {
    const page = await this._integration.getTable<T>(id)
    return new AirtableTableSpi<T>(page)
  }
}
