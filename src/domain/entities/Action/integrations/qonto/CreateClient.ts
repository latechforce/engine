import { type BaseActionIntegrationConfig } from '/domain/entities/Action/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'
import type { QontoClient } from '/domain/integrations/Qonto/QontoTypes'
import type { QontoCreateClient } from '/domain/integrations/Qonto/QontoTypes'
import {
  BaseQontoAction,
  type BaseQontoActionIntegrations,
  type BaseQontoActionServices,
} from './base'

type QontoCreateClientAsTemplateObjectCompiled = ConvertToTemplateObjectCompiled<QontoCreateClient>
type QontoCreateClientAsTemplateObjectFilled = ConvertToTemplateObjectFilled<QontoCreateClient>

export type CreateClientQontoActionServices = BaseQontoActionServices

export type CreateClientQontoActionIntegrations = BaseQontoActionIntegrations

export interface CreateClientQontoActionConfig extends BaseActionIntegrationConfig {
  client: QontoCreateClient
}

type Input = { client: QontoCreateClient }
type Output = QontoClient

export class CreateClientQontoAction extends BaseQontoAction<Input, Output> {
  private _client: QontoCreateClientAsTemplateObjectCompiled

  constructor(
    config: CreateClientQontoActionConfig,
    services: CreateClientQontoActionServices,
    integrations: CreateClientQontoActionIntegrations
  ) {
    super(config, services, integrations)
    const { client } = config
    const { templateCompiler } = services
    const clientChecked = this._checkTemplateObject(client)
    this._client =
      templateCompiler.compileObject<QontoCreateClientAsTemplateObjectCompiled>(clientChecked)
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      client: Template.fillObject<QontoCreateClientAsTemplateObjectFilled>(
        this._client,
        context.data
      ),
    }
  }

  protected _process = async (input: Input) => {
    const { account } = this._config
    return this._integrations.qonto.createClient(account, input.client)
  }
}
