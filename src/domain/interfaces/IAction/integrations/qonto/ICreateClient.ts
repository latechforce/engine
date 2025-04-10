import type { CreateClientQontoActionConfig } from '/domain/entities/Action/integrations/qonto/CreateClient'

export interface ICreateClientQontoAction extends CreateClientQontoActionConfig {
  integration: 'Qonto'
  action: 'CreateClient'
}
