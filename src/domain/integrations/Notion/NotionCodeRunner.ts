import type { NotionTablePage } from './NotionTablePage'
import type { NotionTablePageProperties, UpdateNotionTablePageProperties } from './NotionTypes'
import type { NotionUser } from './NotionUser'
import type { FilterConfig } from '/domain/entities/Filter'

export interface NotionCodeRunner {
  getTable: <T extends NotionTablePageProperties>(
    account: string,
    id: string
  ) => Promise<NotionCodeRunnerTable<T>>
  listAllUsers: (account: string) => Promise<NotionUser[]>
}

export interface NotionCodeRunnerTable<
  T extends NotionTablePageProperties = NotionTablePageProperties,
> {
  insert: (data: T) => Promise<NotionTablePage<T>>
  insertMany: (data: T[]) => Promise<NotionTablePage<T>[]>
  update: (id: string, data: Partial<T>) => Promise<NotionTablePage<T>>
  updateMany: (data: UpdateNotionTablePageProperties<T>[]) => Promise<NotionTablePage<T>[]>
  archive: (id: string) => Promise<void>
  retrieve: (id: string) => Promise<NotionTablePage<T>>
  list: (filter?: FilterConfig) => Promise<NotionTablePage<T>[]>
}
