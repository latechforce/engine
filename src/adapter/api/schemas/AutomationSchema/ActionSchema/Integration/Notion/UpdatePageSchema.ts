import type { UpdatePageNotionActionConfig } from '/domain/entities/Action/integrations/notion/UpdatePage'

/**
 * Interface for updating a page in Notion
 * @title Update Page
 * @description Updates a page in Notion with the specified properties
 */
export interface UpdatePageNotionIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: UpdatePageNotionActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'Notion'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'UpdatePage'
  /**
   * The table identifier for this action
   * @title Table
   * @description The table identifier for this action
   */
  table: UpdatePageNotionActionConfig['table']
  /**
   * The page identifier for this action
   * @title Page
   * @description The page identifier for this action
   */
  id: UpdatePageNotionActionConfig['id']
  /**
   * The page identifier for this action
   * @title Page
   * @description The page identifier for this action
   */
  page: UpdatePageNotionActionConfig['page']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: UpdatePageNotionActionConfig['account']
}
