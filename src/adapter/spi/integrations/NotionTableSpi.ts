import { type Filter, type FilterDto } from '/domain/entities/Filter'
import type {
  INotionTableSpi,
  UpdateNotionTablePageProperties,
} from '/domain/integrations/Notion/NotionTable'
import { FilterMapper } from '../mappers/FilterMapper'
import type { NotionTablePageProperties } from '/domain/integrations/Notion/NotionTablePage'
import { NotionTablePageMapper } from '../mappers/NotionTablePageMapper'
import type { NotionTablePageDto } from '../dtos/NotionTablePageDto'

export interface INotionTableIntegration<
  T extends NotionTablePageProperties = NotionTablePageProperties,
> {
  id: string
  name: string
  insert: (page: T) => Promise<NotionTablePageDto<T>>
  insertMany: (pages: T[]) => Promise<NotionTablePageDto<T>[]>
  update: (id: string, page: Partial<T>) => Promise<NotionTablePageDto<T>>
  updateMany: (pages: UpdateNotionTablePageProperties<T>[]) => Promise<NotionTablePageDto<T>[]>
  retrieve: (id: string) => Promise<NotionTablePageDto<T>>
  archive: (id: string) => Promise<void>
  list: (filter?: FilterDto) => Promise<NotionTablePageDto<T>[]>
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
    const dto = await this._integration.insert(page)
    return NotionTablePageMapper.toEntity<T>(dto)
  }

  insertMany = async (pages: T[]) => {
    const dtos = await this._integration.insertMany(pages)
    return NotionTablePageMapper.toManyEntities<T>(dtos)
  }

  update = async (id: string, page: Partial<T>) => {
    const dto = await this._integration.update(id, page)
    return NotionTablePageMapper.toEntity<T>(dto)
  }

  updateMany = async (pages: UpdateNotionTablePageProperties<T>[]) => {
    const dtos = await this._integration.updateMany(pages)
    return NotionTablePageMapper.toManyEntities<T>(dtos)
  }

  retrieve = async (id: string) => {
    const dto = await this._integration.retrieve(id)
    return NotionTablePageMapper.toEntity<T>(dto)
  }

  archive = async (id: string) => {
    return this._integration.archive(id)
  }

  list = async (filter?: Filter) => {
    const dtos = await this._integration.list(filter ? FilterMapper.toDto(filter) : undefined)
    return NotionTablePageMapper.toManyEntities<T>(dtos)
  }
}
