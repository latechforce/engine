import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { Qonto } from '/domain/integrations/Qonto'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'
import type { QontoClient } from '/domain/integrations/Qonto/QontoTypes'
import type { QontoCreateClient } from '/domain/integrations/Qonto/QontoTypes'

type QontoCreateClientAsTemplateObjectCompiled = ConvertToTemplateObjectCompiled<QontoCreateClient>
type QontoCreateClientAsTemplateObjectFilled = ConvertToTemplateObjectFilled<QontoCreateClient>

export interface CreateClientQontoActionConfig extends BaseActionConfig {
  client: QontoCreateClient
}

export interface CreateClientQontoActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface CreateClientQontoActionIntegrations {
  qonto: Qonto
}

type Input = { client: QontoCreateClient }
type Output = QontoClient

export class CreateClientQontoAction extends BaseAction<Input, Output> {
  private _client: QontoCreateClientAsTemplateObjectCompiled

  constructor(
    config: CreateClientQontoActionConfig,
    services: CreateClientQontoActionServices,
    private _integrations: CreateClientQontoActionIntegrations
  ) {
    super(config, services)
    const { client } = config
    const { templateCompiler } = services
    const clientChecked = this._checkTemplateObject(client)
    this._client =
      templateCompiler.compileObject<QontoCreateClientAsTemplateObjectCompiled>(clientChecked)
  }

  validateConfig = async () => {
    return this._integrations.qonto.checkConfiguration()
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
    return this._integrations.qonto.createClient(input.client)
  }
}
