import type { Filter } from '/domain/entities/Filter'
import type { AirtableTableRecord, AirtableTableRecordFields } from './AirtableTableRecord'

export type UpdateAirtableTableRecord<T extends AirtableTableRecordFields> = {
  id: string
  fields: Partial<T>
}

export interface IAirtableTableSpi<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  id: string
  name: string
  insert: (record: T) => Promise<AirtableTableRecord<T>>
  insertMany: (records: T[]) => Promise<AirtableTableRecord<T>[]>
  update: (id: string, fields: Partial<T>) => Promise<AirtableTableRecord<T>>
  updateMany: (records: UpdateAirtableTableRecord<T>[]) => Promise<AirtableTableRecord<T>[]>
  retrieve: (id: string) => Promise<AirtableTableRecord<T>>
  list: (filter?: Filter) => Promise<AirtableTableRecord<T>[]>
  delete: (id: string) => Promise<void>
}

export class AirtableTable<T extends AirtableTableRecordFields = AirtableTableRecordFields> {
  constructor(private _spi: IAirtableTableSpi<T>) {}

  get id() {
    return this._spi.id
  }

  insert = async (record: T): Promise<AirtableTableRecord<T>> => {
    return this._spi.insert(record)
  }

  insertMany = async (records: T[]): Promise<AirtableTableRecord<T>[]> => {
    return this._spi.insertMany(records)
  }

  update = async (id: string, record: Partial<T>): Promise<AirtableTableRecord<T>> => {
    return this._spi.update(id, record)
  }

  updateMany = async (
    records: UpdateAirtableTableRecord<T>[]
  ): Promise<AirtableTableRecord<T>[]> => {
    return this._spi.updateMany(records)
  }

  retrieve = async (id: string) => {
    return this._spi.retrieve(id)
  }

  delete = async (id: string) => {
    return this._spi.delete(id)
  }

  list = async (filter?: Filter) => {
    return this._spi.list(filter)
  }
}
