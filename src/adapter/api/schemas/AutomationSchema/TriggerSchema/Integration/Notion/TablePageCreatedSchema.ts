import type { TablePageCreatedNotionTriggerConfig } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'

/**
 * Table Page Created Notion Trigger
 * @title Table Page Created
 * @description A trigger that fires when a table page is created in Notion
 */
export interface TablePageCreatedNotionIntegrationTriggerAutomationSchema {
  /**
   * The integration type for this trigger
   * @title Integration
   * @description The integration type for this trigger
   */
  integration: 'Notion'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'TablePageCreated'
  /**
   * The database identifier for this trigger
   * @title Database
   * @description The database identifier for this trigger
   */
  table: TablePageCreatedNotionTriggerConfig['table']
  /**
   * The account identifier for this trigger
   * @title Account
   * @description The account identifier for this trigger
   */
  account: TablePageCreatedNotionTriggerConfig['account']
}
