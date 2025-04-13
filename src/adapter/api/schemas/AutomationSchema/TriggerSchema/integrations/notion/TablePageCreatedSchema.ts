import type { TablePageCreatedNotionTriggerConfig } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'

/**
 * Table Page Created Notion Trigger
 * @title Table Page Created
 * @description A trigger that fires when a table page is created in Notion
 */
export interface TablePageCreatedNotionTriggerSchema
  extends Omit<TablePageCreatedNotionTriggerConfig, 'automation'> {
  integration: 'Notion'
  event: 'TablePageCreated'
}
