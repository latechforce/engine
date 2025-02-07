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
import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import type { ITable } from '/domain/interfaces/ITable'

export class NotionTableIntegration implements INotionTableIntegration {
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

  insert = async <T extends NotionTablePageProperties>(page: T) => {
    const id = this._getId()
    await this._db.insert({
      id,
      fields: this._preprocess(page),
      created_at: new Date(),
    })
    return this.retrieve<T>(id)
  }

  insertMany = async <T extends NotionTablePageProperties>(pages: T[]) => {
    const pagesToInsert = pages.map((page) => ({
      id: this._getId(),
      fields: this._preprocess(page),
      created_at: new Date(),
    }))
    await this._db.insertMany(pagesToInsert)
    return Promise.all(pagesToInsert.map((page) => this.retrieve<T>(page.id)))
  }

  update = async <T extends NotionTablePageProperties>(id: string, page: Partial<T>) => {
    const fields = this._preprocess(page)
    await this._db.update({
      id,
      fields,
      updated_at: new Date(),
    })
    return this.retrieve<T>(id)
  }

  updateMany = async <T extends NotionTablePageProperties>(
    pages: { id: string; page: Partial<T> }[]
  ) => {
    const pagesToUpdate = pages.map(({ id, page }) => ({
      id,
      fields: this._preprocess(page),
      updated_at: new Date(),
    }))
    await this._db.updateMany(pagesToUpdate)
    return Promise.all(pagesToUpdate.map((page) => this.retrieve<T>(page.id)))
  }

  retrieve = async <T extends NotionTablePageProperties>(id: string) => {
    const record = await this._db.readById(id)
    if (!record) throw new Error(`Record not found: ${id}`)
    return this._postprocess<T>(record)
  }

  archive = async (id: string) => {
    await this._db.update({
      id,
      fields: {
        archived: true,
      },
      updated_at: new Date(),
    })
  }

  archiveMany = async (ids: string[]) => {
    const pagesArchived: Promise<void>[] = []
    for (const id of ids) pagesArchived.push(this.archive(id))
    return Promise.all(pagesArchived)
  }

  list = async <T extends NotionTablePageProperties>(filter?: FilterDto) => {
    const records = await this._db.list(filter)
    return records.map((record) => this._postprocess<T>(record))
  }

  private _getId = () => {
    return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')(21)
  }

  private _preprocess = (page: NotionTablePageProperties): RecordFields => {
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

  private _postprocess = <T extends NotionTablePageProperties>(
    record: PersistedRecordFieldsDto<RecordFields>
  ): NotionTablePageDto<T> => {
    const page: RecordFields = {}
    for (const [key, value] of Object.entries(record.fields)) {
      const property = this._properties.find((p) => p.name === key)
      if (!property) throw new Error(`Property "${key}" does not exist`)
      switch (property.type) {
        case 'Email':
        case 'SingleLineText':
          page[key] = value ?? null
          break
        case 'DateTime':
          page[key] = value ? new Date(value as number) : null
          break
        case 'Number':
          page[key] = value ?? null
          break
        case 'Checkbox':
          page[key] = value ?? false
          break
        case 'SingleSelect':
          page[key] = value ?? null
          break
        case 'MultipleSelect':
          page[key] = value ? (value as string[]) : []
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
        case 'Rollup':
          page[key] = value ?? null
          break
        default:
          throw new Error(`Invalid property type: ${property.type}`)
      }
    }
    return {
      id: record.id,
      properties: page as T,
      created_time: record.created_at.toISOString(),
      last_edited_time: record.updated_at?.toISOString() ?? record.created_at.toISOString(),
      archived: record.fields.archived ? Boolean(record.fields.archived) : false,
    }
  }
}

export const notionTableSample1: ITable = {
  name: 'table_1',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
    {
      name: 'number',
      type: 'Number',
    },
    {
      name: 'boolean',
      type: 'Checkbox',
    },
    {
      name: 'text',
      type: 'SingleLineText',
    },
    {
      name: 'url',
      type: 'SingleLineText',
    },
    {
      name: 'email',
      type: 'SingleLineText',
    },
    {
      name: 'phone',
      type: 'SingleLineText',
    },
    {
      name: 'single_select',
      type: 'SingleSelect',
      options: ['2', '1'],
    },
    {
      name: 'status',
      type: 'SingleSelect',
      options: ['Pas commencé', 'En cours', 'Terminé'],
    },
    {
      name: 'multi_select',
      type: 'MultipleSelect',
      options: ['4', '3', '2', '1'],
    },
    {
      name: 'date',
      type: 'DateTime',
    },
    {
      name: 'people',
      type: 'MultipleSelect',
      options: ['1', '2'],
    },
    {
      name: 'files',
      type: 'MultipleAttachment',
    },
    {
      name: 'relation',
      type: 'MultipleLinkedRecord',
      table: 'table_2',
    },
    {
      name: 'rollup_names',
      type: 'Rollup',
      multipleLinkedRecord: 'relation',
      linkedRecordField: 'name',
      formula: "CONCAT(values, ', ')",
      output: {
        type: 'SingleLineText',
      },
    },
    {
      name: 'archived',
      type: 'Checkbox',
    },
  ],
}

export const notionTableSample2: ITable = {
  name: 'table_2',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
  ],
}

export const notionTableSample3: ITable = {
  name: '1359911026ec80debaeec151ac33800b',
  fields: [
    {
      name: 'Email de contact',
      type: 'Email',
    },
    {
      name: '[App] Nom',
      type: 'SingleLineText',
    },
  ],
}

export const notionUserSample: NotionUserDto = {
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
}
