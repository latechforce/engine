import type { Filter } from '@domain/entities/Filter'
import type { AirtableTableRecord, AirtableTableRecordFields } from './AirtableTableRecord'

export type UpdateAirtableTableRecord<T extends AirtableTableRecordFields> = {
  id: string
  fields: Partial<T>
}

export interface IAirtableTableSpi {
  id: string
  name: string
  insert: <T extends AirtableTableRecordFields>(record: T) => Promise<AirtableTableRecord<T>>
  insertMany: <T extends AirtableTableRecordFields>(
    records: T[]
  ) => Promise<AirtableTableRecord<T>[]>
  update: <T extends AirtableTableRecordFields>(
    id: string,
    fields: Partial<T>
  ) => Promise<AirtableTableRecord<T>>
  updateMany: <T extends AirtableTableRecordFields>(
    records: UpdateAirtableTableRecord<T>[]
  ) => Promise<AirtableTableRecord<T>[]>
  retrieve: <T extends AirtableTableRecordFields>(id: string) => Promise<AirtableTableRecord<T>>
  list: <T extends AirtableTableRecordFields>(filter?: Filter) => Promise<AirtableTableRecord<T>[]>
  archive: (id: string) => Promise<void>
}

export class AirtableTable {
  constructor(private _spi: IAirtableTableSpi) {}

  get id() {
    return this._spi.id
  }

  insert = async <T extends AirtableTableRecordFields>(
    record: T
  ): Promise<AirtableTableRecord<T>> => {
    return this._spi.insert<T>(record)
  }

  insertMany = async <T extends AirtableTableRecordFields>(
    records: T[]
  ): Promise<AirtableTableRecord<T>[]> => {
    return this._spi.insertMany<T>(records)
  }

  update = async <T extends AirtableTableRecordFields>(
    id: string,
    record: Partial<T>
  ): Promise<AirtableTableRecord<T>> => {
    return this._spi.update<T>(id, record)
  }

  updateMany = async <T extends AirtableTableRecordFields>(
    records: UpdateAirtableTableRecord<T>[]
  ): Promise<AirtableTableRecord<T>[]> => {
    return this._spi.updateMany<T>(records)
  }

  retrieve = async <T extends AirtableTableRecordFields>(id: string) => {
    return this._spi.retrieve<T>(id)
  }

  archive = async (id: string) => {
    return this._spi.archive(id)
  }

  list = async <T extends AirtableTableRecordFields>(filter?: Filter) => {
    return this._spi.list<T>(filter)
  }
}
