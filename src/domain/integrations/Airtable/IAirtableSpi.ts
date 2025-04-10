import type { AirtableTableRecordFields } from './AirtableTypes'
import type { IAirtableTableSpi } from './IAirtableTableSpi'
import type { BaseSpi } from '../base'
import type { AirtableConfig } from './AirtableConfig'

export interface IAirtableSpi extends BaseSpi<AirtableConfig> {
  getTable: <T extends AirtableTableRecordFields>(id: string) => Promise<IAirtableTableSpi<T>>
}
