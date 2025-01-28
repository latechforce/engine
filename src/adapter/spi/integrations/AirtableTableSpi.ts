import { type Filter, type FilterDto } from '/domain/entities/Filter'
import type {
  IAirtableTableSpi,
  UpdateAirtableTableRecord,
} from '/domain/integrations/Airtable/AirtableTable'
import { FilterMapper } from '../mappers/FilterMapper'
import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTableRecord'
import { AirtableTableRecordMapper } from '../mappers/AirtableTableRecordMapper'
import type { AirtableTableRecordDto } from '../dtos/AirtableTableRecordDto'

export interface IAirtableTableIntegration {
  id: string
  name: string
  insert: <T extends AirtableTableRecordFields>(record: T) => Promise<AirtableTableRecordDto<T>>
  insertMany: <T extends AirtableTableRecordFields>(
    records: T[]
  ) => Promise<AirtableTableRecordDto<T>[]>
  update: <T extends AirtableTableRecordFields>(
    id: string,
    fields: Partial<T>
  ) => Promise<AirtableTableRecordDto<T>>
  updateMany: <T extends AirtableTableRecordFields>(
    records: UpdateAirtableTableRecord<T>[]
  ) => Promise<AirtableTableRecordDto<T>[]>
  retrieve: <T extends AirtableTableRecordFields>(id: string) => Promise<AirtableTableRecordDto<T>>
  delete: (id: string) => Promise<void>
  list: <T extends AirtableTableRecordFields>(
    filter?: FilterDto
  ) => Promise<AirtableTableRecordDto<T>[]>
}

export class AirtableTableSpi implements IAirtableTableSpi {
  constructor(private _integration: IAirtableTableIntegration) {}

  get id() {
    return this._integration.id
  }

  get name() {
    return this._integration.name
  }

  insert = async <T extends AirtableTableRecordFields>(record: T) => {
    const dto = await this._integration.insert(record)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  insertMany = async <T extends AirtableTableRecordFields>(records: T[]) => {
    const dtos = await this._integration.insertMany(records)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }

  update = async <T extends AirtableTableRecordFields>(id: string, record: Partial<T>) => {
    const dto = await this._integration.update(id, record)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  updateMany = async <T extends AirtableTableRecordFields>(
    records: UpdateAirtableTableRecord<T>[]
  ) => {
    const dtos = await this._integration.updateMany(records)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }

  retrieve = async <T extends AirtableTableRecordFields>(id: string) => {
    const dto = await this._integration.retrieve<T>(id)
    return AirtableTableRecordMapper.toEntity<T>(dto)
  }

  delete = async (id: string) => {
    return this._integration.delete(id)
  }

  list = async <T extends AirtableTableRecordFields>(filter?: Filter) => {
    const dtos = await this._integration.list<T>(filter ? FilterMapper.toDto(filter) : undefined)
    return AirtableTableRecordMapper.toManyEntities<T>(dtos)
  }
}
