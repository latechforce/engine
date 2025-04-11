import type { FilterDto } from '/domain/entities/Filter'
import type { IAirtableTableIntegration } from '/adapter/spi/integrations/AirtableTableSpi'
import type { TableObject } from './AirtableIntegration.mock'
import type { AirtableTableRecordDto } from '/adapter/spi/dtos/AirtableTableRecordDto'
import type { PersistedRecordFieldsDto } from '/adapter/spi/dtos/RecordDto'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { IField } from '/domain/interfaces/IField'
import { customAlphabet } from 'nanoid'
import type { RecordFields } from '/domain/entities/Record'
import type {
  AirtableTableRecordFields,
  UpdateAirtableTableRecord,
} from '/domain/integrations/Airtable'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'

export class AirtableTableIntegration<T extends AirtableTableRecordFields>
  implements IAirtableTableIntegration<T>
{
  readonly id: string
  readonly name: string
  private _fields: IField[]

  constructor(
    private _db: SQLiteDatabaseTableDriver,
    _table: PersistedRecordFieldsDto<TableObject>
  ) {
    this.id = _table.id
    this.name = _table.fields.name
    this._fields = JSON.parse(_table.fields.fields)
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof Error) {
      return { error: { status: 500, message: error.message } }
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string' &&
      'status' in error &&
      typeof error.status === 'number'
    ) {
      return { error: { status: error.status, message: error.message } }
    }
    throw error
  }

  ensure = async () => {
    const exist = await this._db.exists()
    if (!exist) {
      await this._db.create()
      await this._db.createView()
    }
  }

  exists = async () => {
    return this._db.exists()
  }

  create = async () => {
    await this._db.create()
  }

  createView = async () => {
    await this._db.createView()
  }

  insert = async (record: T): Promise<IntegrationResponse<AirtableTableRecordDto<T>>> => {
    try {
      const id = this._getId()
      await this._db.insert({
        id,
        fields: this._preprocess(record),
        created_at: new Date().toISOString(),
      })
      return this.retrieve(id)
    } catch (error) {
      return this._responseError(error)
    }
  }

  insertMany = async (records: T[]): Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>> => {
    try {
      const recordsToInsert = records.map((record) => ({
        id: this._getId(),
        fields: this._preprocess(record),
        created_at: new Date().toISOString(),
      }))
      await this._db.insertMany(recordsToInsert)
      return this.list({
        or: recordsToInsert.map((record) => ({
          field: 'id',
          operator: 'Is',
          value: record.id,
        })),
      })
    } catch (error) {
      return this._responseError(error)
    }
  }

  update = async (
    id: string,
    record: Partial<T>
  ): Promise<IntegrationResponse<AirtableTableRecordDto<T>>> => {
    try {
      const fields = this._preprocess(record)
      await this._db.update({
        id,
        fields,
        updated_at: new Date().toISOString(),
      })
      return this.retrieve(id)
    } catch (error) {
      return this._responseError(error)
    }
  }

  updateMany = async (
    pages: UpdateAirtableTableRecord<T>[]
  ): Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>> => {
    try {
      const recordsToUpdate = pages.map(({ id, fields }) => ({
        id,
        fields: this._preprocess(fields),
        updated_at: new Date().toISOString(),
      }))
      await this._db.updateMany(recordsToUpdate)
      return this.list({
        or: recordsToUpdate.map((record) => ({
          field: 'id',
          operator: 'Is',
          value: record.id,
        })),
      })
    } catch (error) {
      return this._responseError(error)
    }
  }

  retrieve = async (id: string): Promise<IntegrationResponse<AirtableTableRecordDto<T>>> => {
    try {
      const record = await this._db.readById(id)
      if (!record) throw { status: 404, message: 'Record not found' }
      return { data: this._postprocess(record) }
    } catch (error) {
      return this._responseError(error)
    }
  }

  delete = async (id: string): Promise<IntegrationResponse<void>> => {
    try {
      await this._db.delete(id)
      return { data: undefined }
    } catch (error) {
      return this._responseError(error)
    }
  }

  deleteMany = async (ids: string[]): Promise<IntegrationResponse<void>> => {
    try {
      for (const id of ids) await this._db.delete(id)
      return { data: undefined }
    } catch (error) {
      return this._responseError(error)
    }
  }

  list = async (filter?: FilterDto): Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>> => {
    try {
      const records = await this._db.list(filter)
      return { data: records.map((record) => this._postprocess(record)) }
    } catch (error) {
      return this._responseError(error)
    }
  }

  private _getId = () => {
    return (
      'rec' + customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')(21)
    )
  }

  private _preprocess = (record: Partial<T>): RecordFields => {
    const fields: RecordFields = {}
    for (const [key, value] of Object.entries(record)) {
      const property = this._fields.find((p) => p.name === key)
      if (!property) throw new Error(`Field "${key}" not found in schema`)
      if (value === undefined || value === null) {
        fields[key] = null
        continue
      }
      switch (property.type) {
        case 'DateTime':
          if (typeof value === 'number') fields[key] = new Date(value).toISOString()
          else fields[key] = value ? String(value) : null
          break
        case 'Number':
          fields[key] = value ? Number(value) : null
          break
        case 'SingleSelect':
          fields[key] = value ? String(value) : null
          break
        case 'MultipleSelect':
          fields[key] = value ? (value as string[]) : []
          break
        case 'MultipleAttachment':
          if (!Array.isArray(value)) throw new Error(`Invalid property value: ${value}`)
          fields[key] = JSON.stringify(value)
          break
        case 'Checkbox':
          fields[key] = value === 'false' || value === '0' ? false : Boolean(value)
          break
        case 'MultipleLinkedRecord':
          if (!Array.isArray(value)) throw new Error(`Invalid property value: ${value}`)
          if (property.table) {
            fields[key] = value ? (value as string[]) : []
          } else {
            fields[key] = JSON.stringify(value || []) as string
          }
          break
        default:
          fields[key] = value ? String(value) : null
          break
      }
    }
    return fields
  }

  private _postprocess = (
    record: PersistedRecordFieldsDto<RecordFields>
  ): AirtableTableRecordDto<T> => {
    const fields: RecordFields = {}
    for (const [key, value] of Object.entries(record.fields)) {
      const property = this._fields.find((p) => p.name === key)
      if (!property) throw new Error(`Field "${key}" does not exist`)
      switch (property.type) {
        case 'DateTime':
          fields[key] = value ? new Date(value as number).toISOString() : null
          break
        case 'MultipleSelect':
          fields[key] = value ? (value as string[]) : []
          break
        case 'MultipleLinkedRecord':
          if (property.table) {
            fields[key] = value ? (value as string[]) : []
          } else {
            fields[key] = value ? JSON.parse(String(value)) : []
          }
          break
        case 'MultipleAttachment':
          fields[key] = typeof value === 'string' ? JSON.parse(value) : []
          break
        default:
          fields[key] = value ?? null
          break
      }
    }
    return {
      id: record.id,
      fields: fields as T,
      created_time: record.created_at,
    }
  }
}
