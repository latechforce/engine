import type { FilterDto } from '/domain/entities/Filter'
import type { NotionTablePageDto } from '/adapter/spi/dtos/NotionTablePageDto'
import type { INotionTableIntegration } from '/adapter/spi/integrations/NotionTableSpi'
import { type NotionTablePageProperties } from '/domain/integrations/Notion/NotionTablePage'
import type { TableObject } from './NotionIntegration.mock'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLiteTableDriver'
import type { PersistedRecordFieldsDto } from '/adapter/spi/dtos/RecordDto'
import { customAlphabet } from 'nanoid'
import type { RecordFields } from '/domain/entities/Record'
import type { IField } from '/domain/interfaces/IField'

export class NotionTableIntegration<T extends NotionTablePageProperties>
  implements INotionTableIntegration<T>
{
  readonly id: string
  readonly name: string
  private _properties: IField[]

  constructor(
    private _db: SQLiteDatabaseTableDriver,
    _table: PersistedRecordFieldsDto<TableObject>
  ) {
    this.id = _table.id
    this.name = _table.fields.title
    this._properties = JSON.parse(_table.fields.properties)
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

  insert = async (page: T) => {
    const id = this._getId()
    await this._db.insert({
      id,
      fields: this._preprocess(page),
      created_at: new Date().toISOString(),
    })
    return this.retrieve(id)
  }

  insertMany = async (pages: T[]) => {
    const pagesToInsert = pages.map((page) => ({
      id: this._getId(),
      fields: this._preprocess(page),
      created_at: new Date().toISOString(),
    }))
    await this._db.insertMany(pagesToInsert)
    return Promise.all(pagesToInsert.map((page) => this.retrieve(page.id)))
  }

  update = async (id: string, page: Partial<T>) => {
    const fields = this._preprocess(page)
    await this._db.update({
      id,
      fields,
      updated_at: new Date().toISOString(),
    })
    return this.retrieve(id)
  }

  updateMany = async (pages: { id: string; page: Partial<T> }[]) => {
    const pagesToUpdate = pages.map(({ id, page }) => ({
      id,
      fields: this._preprocess(page),
      updated_at: new Date().toISOString(),
    }))
    await this._db.updateMany(pagesToUpdate)
    return Promise.all(pagesToUpdate.map((page) => this.retrieve(page.id)))
  }

  retrieve = async (id: string) => {
    const record = await this._db.readById(id)
    if (!record) throw new Error(`Record not found: ${id}`)
    return this._postprocess(record)
  }

  archive = async (id: string) => {
    await this._db.update({
      id,
      fields: {
        archived: true,
      },
      updated_at: new Date().toISOString(),
    })
  }

  archiveMany = async (ids: string[]) => {
    const pagesArchived: Promise<void>[] = []
    for (const id of ids) pagesArchived.push(this.archive(id))
    return Promise.all(pagesArchived)
  }

  list = async (filter?: FilterDto) => {
    const records = await this._db.list(filter)
    return records.map((record) => this._postprocess(record))
  }

  private _getId = () => {
    return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')(21)
  }

  private _preprocess = (page: Partial<T>): RecordFields => {
    const fields: RecordFields = {}
    for (const [key, value] of Object.entries(page)) {
      const property = this._properties.find((p) => p.name === key)
      if (!property) throw new Error(`Property "${key}" does not exist`)
      if (value === undefined || value === null) {
        fields[key] = null
        continue
      }
      switch (property.type) {
        case 'Email':
        case 'SingleLineText':
          fields[key] = value ? String(value) : null
          break
        case 'DateTime':
          if (typeof value === 'number') fields[key] = new Date(value)
          else fields[key] = value as Date
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
        case 'SingleLinkedRecord':
          if (!Array.isArray(value)) throw new Error(`Invalid property value: ${value}`)
          fields[key] = value.length > 0 ? String(value[0]) : null
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
          throw new Error(`Invalid property type: ${property.type}`)
      }
    }
    return fields
  }

  private _postprocess = (
    record: PersistedRecordFieldsDto<RecordFields>
  ): NotionTablePageDto<T> => {
    const page: RecordFields = {}
    for (const [key, value] of Object.entries(record.fields)) {
      const property = this._properties.find((p) => p.name === key)
      if (!property) throw new Error(`Property "${key}" does not exist`)
      switch (property.type) {
        case 'DateTime':
          page[key] = value ? new Date(value as number) : null
          break
        case 'MultipleSelect':
          page[key] = value ? (value as string[]) : []
          break
        case 'SingleLinkedRecord':
          page[key] = value ? [String(value)] : []
          break
        case 'MultipleLinkedRecord':
          if (property.table) {
            page[key] = value ? (value as string[]) : []
          } else {
            page[key] = value ? JSON.parse(String(value)) : []
          }
          break
        case 'MultipleAttachment':
          page[key] = typeof value === 'string' ? JSON.parse(value) : []
          break
        default:
          page[key] = value ?? null
          break
      }
    }
    return {
      id: record.id,
      properties: page as T,
      created_time: record.created_at,
      last_edited_time: record.updated_at ?? record.created_at,
      archived: record.fields.archived ? Boolean(record.fields.archived) : false,
    }
  }
}
