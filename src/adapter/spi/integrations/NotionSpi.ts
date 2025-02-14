import {
  NotionTableSpi,
  type INotionTableIntegration,
} from '/adapter/spi/integrations/NotionTableSpi'
import type { INotionSpi, NotionConfig } from '/domain/integrations/Notion'
import { NotionUserMapper } from '../mappers/NotionUserMapper'
import type { NotionUserDto } from '../dtos/NotionUserDto'
import type { NotionTablePageProperties } from '/domain/integrations/Notion/NotionTablePage'

export interface INotionIntegration {
  getConfig: () => NotionConfig
  getTable: <T extends NotionTablePageProperties>(id: string) => Promise<INotionTableIntegration<T>>
  listAllUsers: () => Promise<NotionUserDto[]>
}

export class NotionSpi implements INotionSpi {
  constructor(private _integration: INotionIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  getTable = async <T extends NotionTablePageProperties>(id: string) => {
    const page = await this._integration.getTable<T>(id)
    return new NotionTableSpi<T>(page)
  }

  listAllUsers = async () => {
    const dto = await this._integration.listAllUsers()
    return NotionUserMapper.toManyEntities(dto)
  }
}
