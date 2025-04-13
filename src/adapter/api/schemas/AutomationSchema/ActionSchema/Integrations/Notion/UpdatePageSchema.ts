import type { UpdatePageNotionActionConfig } from '/domain/entities/Action/integrations/notion/UpdatePage'

/**
 * Interface for updating a page in Notion
 * @title Update Page
 * @description Updates a page in Notion with the specified properties
 *
 * @example
 * {
 *   integration: 'Notion',
 *   action: 'UpdatePage',
 *   pageId: '{{trigger.payload.pageId}}',
 *   properties: {
 *     title: '{{trigger.payload.title}}',
 *     status: '{{trigger.payload.status}}'
 *   }
 * }
 */
export interface UpdatePageNotionActionSchema extends UpdatePageNotionActionConfig {
  integration: 'Notion'
  action: 'UpdatePage'
}
