import { BaseSpi, type BaseIntegration } from './base'
import {
  AirtableTableSpi,
  type IAirtableTableIntegration,
} from '/adapter/spi/integrations/AirtableTableSpi'
import type { IAirtableSpi, AirtableConfig } from '/domain/integrations/Airtable'
import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTypes'

export interface IAirtableIntegration extends BaseIntegration<AirtableConfig> {
  getTable: <T extends AirtableTableRecordFields>(
    id: string
  ) => Promise<IAirtableTableIntegration<T>>
}

export class AirtableSpi
  extends BaseSpi<AirtableConfig, IAirtableIntegration>
  implements IAirtableSpi
{
  constructor(integration: IAirtableIntegration) {
    super(integration)
  }

  getTable = async <T extends AirtableTableRecordFields>(id: string) => {
    const page = await this._integration.getTable<T>(id)
    return new AirtableTableSpi<T>(page)
  }
}
