import type { UpdatePageNotionActionConfig } from '/domain/entities/Action/integrations/notion/UpdatePage'

/**
 * Interface for updating a Notion page
 * @title Update Notion Page Action
 * @description Updates the properties of a Notion page in the specified database
 *
 * @example
 * {
 *   integration: 'Notion',
 *   action: 'UpdatePage',
 *   table: 'projects',
 *   id: '{{trigger.payload.pageId}}',
 *   page: {
 *     status: 'In Progress',
 *     assignee: '{{trigger.payload.user}}',
 *     dueDate: '{{trigger.payload.dueDate}}',
 *     priority: 'High',
 *     description: 'Project description with {{trigger.payload.details}}'
 *   }
 * }
 *
 * @property {string} integration - Always 'Notion' for Notion integration
 * @property {string} action - Always 'UpdatePage' for page updates
 * @property {string} table - The name of the Notion database containing the page
 * @property {string} id - The ID of the page to update
 * @property {object} page - The properties to update on the page
 */
export interface IUpdatePageNotionAction extends UpdatePageNotionActionConfig {
  integration: 'Notion'
  action: 'UpdatePage'
}
