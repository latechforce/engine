import {
  AirtableTableSpi,
  type IAirtableTableIntegration,
} from '/adapter/spi/integrations/AirtableTableSpi'
import type { IAirtableSpi, AirtableConfig } from '/domain/integrations/Airtable'

export interface IAirtableIntegration {
  getConfig: () => AirtableConfig
  getTable: (id: string) => Promise<IAirtableTableIntegration>
}

export class AirtableSpi implements IAirtableSpi {
  constructor(private _integration: IAirtableIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  getTable = async (id: string) => {
    const page = await this._integration.getTable(id)
    return new AirtableTableSpi(page)
  }
}
