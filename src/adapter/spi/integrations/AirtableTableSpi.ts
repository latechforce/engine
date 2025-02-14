import { type Filter, type FilterDto } from '/domain/entities/Filter'
import type {
  IAirtableTableSpi,
  UpdateAirtableTableRecord,
} from '/domain/integrations/Airtable/AirtableTable'
import { FilterMapper } from '../mappers/FilterMapper'
import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTableRecord'
import { AirtableTableRecordMapper } from '../mappers/AirtableTableRecordMapper'
import type { AirtableTableRecordDto } from '../dtos/AirtableTableRecordDto'

export interface IAirtableTableIntegration<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  id: string
  name: string
  insert: (record: T) => Promise<AirtableTableRecordDto<T>>
  insertMany: (records: T[]) => Promise<AirtableTableRecordDto<T>[]>
  update: (id: string, fields: Partial<T>) => Promise<AirtableTableRecordDto<T>>
  updateMany: (records: UpdateAirtableTableRecord<T>[]) => Promise<AirtableTableRecordDto<T>[]>
  retrieve: (id: string) => Promise<AirtableTableRecordDto<T>>
  delete: (id: string) => Promise<void>
  list: (filter?: FilterDto) => Promise<AirtableTableRecordDto<T>[]>
}

export class AirtableTableSpi<T extends AirtableTableRecordFields> implements IAirtableTableSpi<T> {
  constructor(private _integration: IAirtableTableIntegration<T>) {}

  get id() {
    return this._integration.id
  }

  get name() {
    return this._integration.name
  }

  insert = async (record: T) => {
    const dto = await this._integration.insert(record)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  insertMany = async (records: T[]) => {
    const dtos = await this._integration.insertMany(records)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }

  update = async (id: string, record: Partial<T>) => {
    const dto = await this._integration.update(id, record)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  updateMany = async (records: UpdateAirtableTableRecord<T>[]) => {
    const dtos = await this._integration.updateMany(records)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }

  retrieve = async (id: string) => {
    const dto = await this._integration.retrieve(id)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  delete = async (id: string) => {
    return this._integration.delete(id)
  }

  list = async (filter?: Filter) => {
    const dtos = await this._integration.list(filter ? FilterMapper.toDto(filter) : undefined)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }
}
