import type { FilterConfig } from '/domain/entities/Filter'
import type { AirtableTableRecord } from './AirtableTableRecord'
import type { IAirtableTableSpi } from './IAirtableTableSpi'
import type { UpdateAirtableTableRecord } from './AirtableTypes'
import { FilterMapper } from '/domain/entities/Filter'
import type { AirtableTableRecordFields } from './AirtableTypes'
import { Integration } from '../base'

export class AirtableTable<T extends AirtableTableRecordFields = AirtableTableRecordFields> {
  constructor(private _spi: IAirtableTableSpi<T>) {}

  get id() {
    return this._spi.id
  }

  insert = async (record: T): Promise<AirtableTableRecord<T>> => {
    const response = await this._spi.insert(record)
    if (response.error) return Integration.throwError('insert', response.error)
    return response.data
  }

  insertMany = async (records: T[]): Promise<AirtableTableRecord<T>[]> => {
    const response = await this._spi.insertMany(records)
    if (response.error) return Integration.throwError('insertMany', response.error)
    return response.data
  }

  update = async (id: string, record: Partial<T>): Promise<AirtableTableRecord<T>> => {
    const response = await this._spi.update(id, record)
    if (response.error) return Integration.throwError('update', response.error)
    return response.data
  }

  updateMany = async (
    records: UpdateAirtableTableRecord<T>[]
  ): Promise<AirtableTableRecord<T>[]> => {
    const response = await this._spi.updateMany(records)
    if (response.error) return Integration.throwError('updateMany', response.error)
    return response.data
  }

  retrieve = async (id: string): Promise<AirtableTableRecord<T>> => {
    const response = await this._spi.retrieve(id)
    if (response.error) return Integration.throwError('retrieve', response.error)
    return response.data
  }

  delete = async (id: string): Promise<void> => {
    const response = await this._spi.delete(id)
    if (response.error) return Integration.throwError('delete', response.error)
  }

  list = async (filterConfig?: FilterConfig): Promise<AirtableTableRecord<T>[]> => {
    const filter = filterConfig ? FilterMapper.toEntity(filterConfig) : undefined
    const response = await this._spi.list(filter)
    if (response.error) return Integration.throwError('list', response.error)
    return response.data
  }

  insertManyWithRollback = async (records: T[]): Promise<AirtableTableRecord<T>[]> => {
    const insertedRecords: AirtableTableRecord<T>[] = []

    try {
      for (const record of records) {
        const response = await this._spi.insert(record)
        if (response.error) {
          throw new Error(`Failed to insert record: ${response.error.message}`)
        }
        insertedRecords.push(response.data)
      }
      return insertedRecords
    } catch (error) {
      // Rollback: Delete all successfully inserted records
      for (const record of insertedRecords) {
        try {
          await this._spi.delete(record.id)
        } catch (deleteError) {
          console.error(`Failed to delete record during rollback: ${deleteError}`)
        }
      }
      throw new Error(
        `Batch insertion failed: ${error.message}. All inserted records have been deleted.`
      )
    }
  }
}
