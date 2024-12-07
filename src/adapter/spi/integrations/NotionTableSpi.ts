import { type Filter } from '@domain/entities/Filter'
import type {
  NotionTablePage,
  NotionTablePageProperties,
  INotionTableSpi,
} from '@domain/integrations/NotionTable'
import type { FilterDto } from '../dtos/FilterDto'
import { FilterMapper } from '../mappers/FilterMapper'

export interface INotionTableIntegration {
  id: string
  name: string
  create: (page: NotionTablePageProperties) => Promise<NotionTablePage>
  update: (id: string, page: NotionTablePageProperties) => Promise<NotionTablePage>
  retrieve: (id: string) => Promise<NotionTablePage>
  archive: (id: string) => Promise<void>
  list: (filter?: FilterDto) => Promise<NotionTablePage[]>
}

export class NotionTableSpi implements INotionTableSpi {
  constructor(private _integration: INotionTableIntegration) {}

  get id() {
    return this._integration.id
  }

  get name() {
    return this._integration.name
  }

  create = async (page: NotionTablePageProperties) => {
    return this._integration.create(page)
  }

  update = async (id: string, page: NotionTablePageProperties) => {
    return this._integration.update(id, page)
  }

  retrieve = async (id: string) => {
    return this._integration.retrieve(id)
  }

  archive = async (id: string) => {
    return this._integration.archive(id)
  }

  list = async (filter?: Filter) => {
    return this._integration.list(filter ? FilterMapper.toDto(filter) : undefined)
  }
}
