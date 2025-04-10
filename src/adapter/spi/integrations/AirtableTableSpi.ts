import { type Filter, type FilterDto } from '/domain/entities/Filter'
import type {
  UpdateAirtableTableRecord,
  AirtableTableRecordFields,
} from '/domain/integrations/Airtable/AirtableTypes'
import { FilterMapper } from '../mappers/FilterMapper'
import { AirtableTableRecordMapper } from '../mappers/AirtableTableRecordMapper'
import type { AirtableTableRecordDto } from '../dtos/AirtableTableRecordDto'
import type { IAirtableTableSpi } from '/domain/integrations/Airtable/IAirtableTableSpi'
import type { IntegrationResponse } from '/domain/integrations/base'

export interface IAirtableTableIntegration<
  T extends AirtableTableRecordFields = AirtableTableRecordFields,
> {
  id: string
  name: string
  insert: (record: T) => Promise<IntegrationResponse<AirtableTableRecordDto<T>>>
  insertMany: (records: T[]) => Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>>
  update: (
    id: string,
    fields: Partial<T>
  ) => Promise<IntegrationResponse<AirtableTableRecordDto<T>>>
  updateMany: (
    records: UpdateAirtableTableRecord<T>[]
  ) => Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>>
  retrieve: (id: string) => Promise<IntegrationResponse<AirtableTableRecordDto<T>>>
  delete: (id: string) => Promise<IntegrationResponse<void>>
  list: (filter?: FilterDto) => Promise<IntegrationResponse<AirtableTableRecordDto<T>[]>>
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
    const response = await this._integration.insert(record)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  insertMany = async (records: T[]) => {
    const response = await this._integration.insertMany(records)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  update = async (id: string, record: Partial<T>) => {
    const response = await this._integration.update(id, record)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  updateMany = async (records: UpdateAirtableTableRecord<T>[]) => {
    const response = await this._integration.updateMany(records)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  retrieve = async (id: string) => {
    const response = await this._integration.retrieve(id)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  delete = async (id: string) => {
    const response = await this._integration.delete(id)
    if (!response.error) {
      return {
        data: undefined,
        error: undefined,
      }
    }
    return response
  }

  list = async (filter?: Filter) => {
    const response = await this._integration.list(filter ? FilterMapper.toDto(filter) : undefined)
    if (!response.error) {
      return {
        data: AirtableTableRecordMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }
}
