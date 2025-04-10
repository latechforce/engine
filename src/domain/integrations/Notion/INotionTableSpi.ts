import type { IntegrationResponse } from '../base'
import type { NotionTablePage } from './NotionTablePage'
import type { NotionTablePageProperties, UpdateNotionTablePageProperties } from './NotionTypes'
import type { Filter } from '/domain/entities/Filter'

export interface INotionTableSpi<T extends NotionTablePageProperties = NotionTablePageProperties> {
  id: string
  name: string
  insert: (page: T) => Promise<IntegrationResponse<NotionTablePage<T>>>
  insertMany: (pages: T[]) => Promise<IntegrationResponse<NotionTablePage<T>[]>>
  update: (id: string, page: Partial<T>) => Promise<IntegrationResponse<NotionTablePage<T>>>
  updateMany: (
    pages: UpdateNotionTablePageProperties<T>[]
  ) => Promise<IntegrationResponse<NotionTablePage<T>[]>>
  retrieve: (id: string) => Promise<IntegrationResponse<NotionTablePage<T>>>
  archive: (id: string) => Promise<IntegrationResponse<void>>
  list: (filter?: Filter) => Promise<IntegrationResponse<NotionTablePage<T>[]>>
}
