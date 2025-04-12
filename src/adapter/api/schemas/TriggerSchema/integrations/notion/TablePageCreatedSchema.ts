import type { TablePageCreatedNotionTriggerConfig } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'

export interface TablePageCreatedNotionTriggerSchema
  extends Omit<TablePageCreatedNotionTriggerConfig, 'automation'> {
  integration: 'Notion'
  event: 'TablePageCreated'
}
