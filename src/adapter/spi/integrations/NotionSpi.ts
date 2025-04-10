import {
  NotionTableSpi,
  type INotionTableIntegration,
} from '/adapter/spi/integrations/NotionTableSpi'
import type {
  INotionSpi,
  NotionConfig,
  NotionTablePageProperties,
  NotionUser,
} from '/domain/integrations/Notion'
import { NotionUserMapper } from '../mappers/NotionUserMapper'
import type { NotionUserDto } from '../dtos/NotionUserDto'
import { BaseSpi, type BaseIntegration } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'
export interface INotionIntegration extends BaseIntegration<NotionConfig> {
  getTable: <T extends NotionTablePageProperties>(id: string) => Promise<INotionTableIntegration<T>>
  listAllUsers: () => Promise<IntegrationResponse<NotionUserDto[]>>
}

export class NotionSpi extends BaseSpi<NotionConfig, INotionIntegration> implements INotionSpi {
  constructor(integration: INotionIntegration) {
    super(integration)
  }

  getTable = async <T extends NotionTablePageProperties>(id: string) => {
    const page = await this._integration.getTable<T>(id)
    return new NotionTableSpi<T>(page)
  }

  listAllUsers = async (): Promise<IntegrationResponse<NotionUser[]>> => {
    const response = await this._integration.listAllUsers()
    if (response.data) {
      return {
        data: NotionUserMapper.toManyEntities(response.data),
        error: undefined,
      }
    }
    return {
      data: undefined,
      error: response.error,
    }
  }
}
