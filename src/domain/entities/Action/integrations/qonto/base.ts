import type { Qonto } from '/domain/integrations/Qonto'
import {
  BaseAction,
  type BaseActionIntegrationConfig,
  type BaseActionServices,
} from '/domain/entities/Action/base'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'

export interface BaseQontoActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface BaseQontoActionIntegrations {
  qonto: Qonto
}

export class BaseQontoAction<I extends object, O extends object> extends BaseAction<I, O> {
  constructor(
    protected _config: BaseActionIntegrationConfig,
    services: BaseQontoActionServices,
    protected _integrations: BaseQontoActionIntegrations
  ) {
    super(_config, services)
  }

  validate = async () => {
    const { qonto } = this._integrations
    const { account } = this._config
    return qonto.validate({ account, entity: 'Action', name: this.constructor.name })
  }
}
