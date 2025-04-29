import type { Qonto } from '../../../../integrations/Qonto'
import { type BaseActionServices } from '../../base'
import type { TemplateCompiler } from '../../../../services/TemplateCompiler'
import { BaseIntegrationAction, type BaseActionIntegrationConfig } from '../base'

export interface BaseQontoActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface BaseQontoActionIntegrations {
  qonto: Qonto
}

export class BaseQontoAction<I extends object, O extends object> extends BaseIntegrationAction<
  I,
  O
> {
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
