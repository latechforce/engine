import type { Queue } from '/domain/services/Queue'
import { BaseTrigger, type BaseTriggerIntegrationConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'
import type { Notion } from '/domain/integrations/Notion'
import { NotionTablePage } from '/domain/integrations/Notion/NotionTablePage'

export interface TablePageCreatedNotionTriggerConfig extends BaseTriggerIntegrationConfig {
  table: string
}

export interface TablePageCreatedNotionTriggerServices {
  queue: Queue
}

export interface TablePageCreatedNotionTriggerIntegrations {
  notion: Notion
}

export class TablePageCreatedNotionTrigger extends BaseTrigger<TablePageCreatedNotionTriggerConfig> {
  constructor(
    config: TablePageCreatedNotionTriggerConfig,
    private _services: TablePageCreatedNotionTriggerServices,
    private _integrations: TablePageCreatedNotionTriggerIntegrations
  ) {
    super(config)
  }

  validate = async () => {
    const { notion } = this._integrations
    const { account } = this._config
    return notion.validate({ account, entity: 'Trigger', name: 'TablePageCreatedNotionTrigger' })
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue } = this._services
    const { automation, table: tableId, account } = this._config
    const { notion } = this._integrations
    const table = await notion.getTable(account, tableId)
    table.onInsert(this.onTablePageCreated)
    queue.job(automation, run)
  }

  onTablePageCreated = async (page: NotionTablePage) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, page.toJson())
  }
}
