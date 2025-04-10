import { type Filter, type FilterDto } from '/domain/entities/Filter'
import { FilterMapper } from '../mappers/FilterMapper'
import type {
  NotionTablePageProperties,
  UpdateNotionTablePageProperties,
} from '/domain/integrations/Notion/NotionTypes'
import { NotionTablePageMapper } from '../mappers/NotionTablePageMapper'
import type { NotionTablePageDto } from '../dtos/NotionTablePageDto'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { INotionTableSpi } from '/domain/integrations/Notion/INotionTableSpi'

export interface INotionTableIntegration<
  T extends NotionTablePageProperties = NotionTablePageProperties,
> {
  id: string
  name: string
  insert: (page: T) => Promise<IntegrationResponse<NotionTablePageDto<T>>>
  insertMany: (pages: T[]) => Promise<IntegrationResponse<NotionTablePageDto<T>[]>>
  update: (id: string, page: Partial<T>) => Promise<IntegrationResponse<NotionTablePageDto<T>>>
  updateMany: (
    pages: UpdateNotionTablePageProperties<T>[]
  ) => Promise<IntegrationResponse<NotionTablePageDto<T>[]>>
  retrieve: (id: string) => Promise<IntegrationResponse<NotionTablePageDto<T>>>
  archive: (id: string) => Promise<IntegrationResponse<void>>
  list: (filter?: FilterDto) => Promise<IntegrationResponse<NotionTablePageDto<T>[]>>
}

export class NotionTableSpi<T extends NotionTablePageProperties> implements INotionTableSpi<T> {
  constructor(private _integration: INotionTableIntegration<T>) {}

  get id() {
    return this._integration.id
  }

  get name() {
    return this._integration.name
  }

  insert = async (page: T) => {
    const response = await this._integration.insert(page)
    if (!response.error) {
      return {
        data: NotionTablePageMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  insertMany = async (pages: T[]) => {
    const response = await this._integration.insertMany(pages)
    if (!response.error) {
      return {
        data: NotionTablePageMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  update = async (id: string, page: Partial<T>) => {
    const response = await this._integration.update(id, page)
    if (!response.error) {
      return {
        data: NotionTablePageMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  updateMany = async (pages: UpdateNotionTablePageProperties<T>[]) => {
    const response = await this._integration.updateMany(pages)
    if (!response.error) {
      return {
        data: NotionTablePageMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  retrieve = async (id: string) => {
    const response = await this._integration.retrieve(id)
    if (!response.error) {
      return {
        data: NotionTablePageMapper.toEntity<T>(response.data),
        error: undefined,
      }
    }
    return response
  }

  archive = async (id: string) => {
    const response = await this._integration.archive(id)
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
        data: NotionTablePageMapper.toManyEntities<T>(response.data),
        error: undefined,
      }
    }
    return response
  }
}
