import type { AirtableTableRecordFields } from './AirtableTypes'
import type { AirtableTableRecord } from './AirtableTableRecord'
import type { UpdateAirtableTableRecord } from './AirtableTypes'
import type { Filter } from '/domain/entities/Filter'
import type { IntegrationResponse } from '../base'

export interface IAirtableTableSpi<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  id: string
  name: string
  insert: (record: T) => Promise<IntegrationResponse<AirtableTableRecord<T>>>
  insertMany: (records: T[]) => Promise<IntegrationResponse<AirtableTableRecord<T>[]>>
  update: (id: string, fields: Partial<T>) => Promise<IntegrationResponse<AirtableTableRecord<T>>>
  updateMany: (
    records: UpdateAirtableTableRecord<T>[]
  ) => Promise<IntegrationResponse<AirtableTableRecord<T>[]>>
  retrieve: (id: string) => Promise<IntegrationResponse<AirtableTableRecord<T>>>
  list: (filter?: Filter) => Promise<IntegrationResponse<AirtableTableRecord<T>[]>>
  delete: (id: string) => Promise<IntegrationResponse<void>>
}
