import type { TablePageCreatedNotionTriggerConfig } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'

export interface IPageCreatedNotionTrigger
  extends Omit<TablePageCreatedNotionTriggerConfig, 'automation'> {
  integration: 'Notion'
  event: 'TablePageCreated'
}
