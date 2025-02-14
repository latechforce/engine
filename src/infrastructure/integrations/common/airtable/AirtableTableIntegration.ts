import type { FilterDto } from '/domain/entities/Filter'
import {
  type AirtableTableRecordFields,
  type AirtableTableRecordFieldValue,
} from '/domain/integrations/Airtable/AirtableTableRecord'
import type { IAirtableTableIntegration } from '/adapter/spi/integrations/AirtableTableSpi'
import type { Table, FieldSet, Record } from 'airtable'
import { chunk } from 'lodash'
import type { UpdateAirtableTableRecord } from '/domain/integrations/Airtable/AirtableTable'
import type { QueryParams } from 'airtable/lib/query_params'
import type { AirtableField, AirtableBaseSchemaTable } from './AirtableIntegration'
import { formatISO, parse } from 'date-fns'
import type { AirtableTableRecordDto } from '/adapter/spi/dtos/AirtableTableRecordDto'

export class AirtableTableIntegration<T extends AirtableTableRecordFields>
  implements IAirtableTableIntegration<T>
{
  readonly id: string
  readonly name: string

  constructor(
    private _api: Table<FieldSet>,
    private _schema: AirtableBaseSchemaTable
  ) {
    this.id = this._api.id
    this.name = this._api.name
  }

  insert = async (record: T) => {
    const fields = this._preprocessFields(record)
    const insertedRecord = await this._api.create(fields, { typecast: true })
    return this._postprocessRecord(insertedRecord)
  }

  insertMany = async (records: T[]) => {
    const chunks = chunk(records, 10)
    const recordsToInsert = []
    for (const chunk of chunks) {
      const recordsFields = chunk.map((fields) => ({
        fields: this._preprocessFields(fields),
      }))
      recordsToInsert.push(this._api.create(recordsFields, { typecast: true }))
    }
    const insertedRecords = await Promise.all(recordsToInsert)
    return insertedRecords.flat().map((record) => this._postprocessRecord(record))
  }

  update = async (id: string, record: Partial<T>) => {
    const fields = this._preprocessFields(record)
    const updatedRecord = await this._api.update(id, fields, { typecast: true })
    return this._postprocessRecord(updatedRecord)
  }

  updateMany = async (records: UpdateAirtableTableRecord<T>[]) => {
    const chunks = chunk(records, 10)
    const recordsToUpdate = []
    for (const chunk of chunks) {
      const recordsFields = chunk.map(({ id, fields }) => ({
        id,
        fields: this._preprocessFields(fields),
      }))
      recordsToUpdate.push(this._api.update(recordsFields, { typecast: true }))
    }
    const updatedRecord = await Promise.all(recordsToUpdate)
    return updatedRecord.flat().map((record) => this._postprocessRecord(record))
  }

  retrieve = async (id: string) => {
    const record = await this._api.find(id)
    return this._postprocessRecord(record)
  }

  delete = async (id: string) => {
    await this._api.destroy(id)
  }

  deleteMany = async (ids: string[]) => {
    const chunks = chunk(ids, 10)
    const recordsToDelete = []
    for (const chunk of chunks) {
      recordsToDelete.push(this._api.destroy(chunk))
    }
    await Promise.all(recordsToDelete)
  }

  list = async (filter?: FilterDto) => {
    const query: QueryParams<FieldSet> = {}
    if (filter) {
      query.filterByFormula = this._convertFilter(filter)
    }
    const records = await this._api.select(query).all()
    return records.map((record) => this._postprocessRecord(record))
  }

  private _preprocessFields = (fields: AirtableTableRecordFields): FieldSet => {
    const recordFields: FieldSet = {}
    for (const key in fields) {
      const field = this._schema.fields.find((field) => field.name === key)
      if (!field) {
        throw new Error(`Field "${key}" not found in schema`)
      }
      const setPropertyValue = (value: AirtableTableRecordFieldValue) => {
        switch (field.type) {
          case 'checkbox':
            return value === 'false' || value === '0' ? false : Boolean(value)
          case 'number':
            if (typeof value === 'number') return value
            if (typeof value === 'string') return parseFloat(value)
            return null
          case 'dateTime':
          case 'date':
            if (value instanceof Date) {
              return formatISO(value, { representation: 'complete' })
            }
            if (typeof value === 'number') {
              return formatISO(new Date(value), { representation: 'complete' })
            }
            if (typeof value === 'string') {
              if (value.includes('T') && value.includes('.') && value.includes('Z')) {
                return formatISO(parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), {
                  representation: 'complete',
                })
              } else if (value.includes('T') && value.includes('.')) {
                return formatISO(parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSS", new Date()), {
                  representation: 'complete',
                })
              } else if (value.includes('T')) {
                return formatISO(parse(value, "yyyy-MM-dd'T'HH:mm:ss", new Date()), {
                  representation: 'complete',
                })
              } else {
                return formatISO(parse(value, 'yyyy-MM-dd', new Date()), {
                  representation: 'complete',
                })
              }
            }
            return null
          default:
            return value
        }
      }
      // TODO: manage all properties types
      // eslint-disable-next-line
      // @ts-ignore
      recordFields[key] = setPropertyValue(fields[key])
    }
    return recordFields
  }

  private _postprocessRecord = (record: Record<FieldSet>): AirtableTableRecordDto<T> => {
    const fields: AirtableTableRecordFields = {}
    for (const field of this._schema.fields) {
      const getPropertyValue = (field: AirtableField): AirtableTableRecordFieldValue => {
        const value = record.get(field.name)
        if (value === undefined && field.type !== 'checkbox') return null
        switch (field.type) {
          case 'checkbox':
            return !!value
          case 'multipleSelects':
            if (value && Array.isArray(value) && typeof value[0] === 'string') return value
            throw new Error('Field "multipleSelect" should be an array')
          case 'singleCollaborator':
            if (value && typeof value === 'object' && 'email' in value) return value.email
            throw new Error('Field "singleCollaborator" should have an email property')
          case 'multipleCollaborators':
            if (value && Array.isArray(value) && 'email' in value[0])
              return value.map((v) => v.email)
            throw new Error('Field "multipleCollaborators" should have an email property')
          case 'dateTime':
          case 'date':
            if (value && typeof value === 'string') return value
            throw new Error('Field "date" should be a string')
          default:
            if (
              typeof value === 'string' ||
              typeof value === 'number' ||
              typeof value === 'boolean'
            ) {
              return value
            }
            return null
        }
      }
      fields[field.name] = getPropertyValue(field)
    }
    return {
      id: record.id,
      fields: fields as T,
      created_time: record._rawJson.createdTime,
    }
  }

  private _convertFilter = (filter: FilterDto): string => {
    if ('and' in filter) {
      return `AND(${filter.and.map(this._convertFilter).join(',')})`
    } else if ('or' in filter) {
      return `OR(${filter.or.map(this._convertFilter).join(',')})`
    }
    const fieldSchema = this._schema.fields.find((field) => field.name === filter.field)
    if (!fieldSchema) {
      throw new Error(`Field "${filter.field}" does not exist`)
    }
    const { operator, field } = filter
    switch (operator) {
      case 'Is': {
        if (
          fieldSchema.type === 'singleLineText' ||
          fieldSchema.type === 'multilineText' ||
          fieldSchema.type === 'singleSelect' ||
          fieldSchema.type === 'formula'
        ) {
          return `{${field}} = '${filter.value}'`
        }
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'Contains': {
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'IsBefore': {
        return `IS_BEFORE({${field}}, "${filter.value}")`
      }
      case 'IsAfter': {
        return `IS_AFTER({${field}}, "${filter.value}")`
      }
      case 'OnOrAfter': {
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'Equals': {
        if (fieldSchema.type === 'number') {
          return `{${field}} = ${filter.value}`
        }
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'IsAnyOf': {
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'IsFalse': {
        if (fieldSchema.type === 'checkbox') {
          return `{${field}} = FALSE()`
        }
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      case 'IsTrue': {
        if (fieldSchema.type === 'checkbox') {
          return `{${field}} = TRUE()`
        }
        throw new Error(
          `Operator "${operator}" is not supported for field type "${fieldSchema.type}"`
        )
      }
      default: {
        throw new Error(`Operator "${operator}" is not supported`)
      }
    }
  }
}
