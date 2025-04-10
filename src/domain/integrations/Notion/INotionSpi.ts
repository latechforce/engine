import type { NotionUser } from './NotionUser'
import type { NotionTablePageProperties } from './NotionTypes'
import type { BaseSpi } from '../base'
import type { NotionConfig } from './NotionConfig'
import type { IntegrationResponse } from '../base'
import type { INotionTableSpi } from './INotionTableSpi'

export interface INotionSpi extends BaseSpi<NotionConfig> {
  getTable: <T extends NotionTablePageProperties>(id: string) => Promise<INotionTableSpi<T>>
  listAllUsers: () => Promise<IntegrationResponse<NotionUser[]>>
}
