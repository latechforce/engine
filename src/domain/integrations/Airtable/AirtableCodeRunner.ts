import type { FilterConfig } from '/domain/entities/Filter'
import type { UpdateAirtableTableRecord } from './AirtableTypes'
import type { AirtableTableRecordFields } from './AirtableTypes'
import type { AirtableTableRecord } from './AirtableTableRecord'

export interface AirtableCodeRunner {
  getTable: <T extends AirtableTableRecordFields>(
    account: string,
    id: string
  ) => Promise<AirtableCodeRunnerTable<T>>
}

export interface AirtableCodeRunnerTable<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  insert: (record: T) => Promise<AirtableTableRecord<T>>
  insertMany: (records: T[]) => Promise<AirtableTableRecord<T>[]>
  update: (id: string, record: Partial<T>) => Promise<AirtableTableRecord<T>>
  updateMany: (records: UpdateAirtableTableRecord<T>[]) => Promise<AirtableTableRecord<T>[]>
  delete: (id: string) => Promise<void>
  retrieve: (id: string) => Promise<AirtableTableRecord<T>>
  list: (filter?: FilterConfig) => Promise<AirtableTableRecord<T>[]>
}
