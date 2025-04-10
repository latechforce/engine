import type { UpdatePageNotionActionConfig } from '/domain/entities/Action/integrations/notion/UpdatePage'

export interface IUpdatePageNotionAction extends UpdatePageNotionActionConfig {
  integration: 'Notion'
  action: 'UpdatePage'
}
