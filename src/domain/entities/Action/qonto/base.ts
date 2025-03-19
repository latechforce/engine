import type { Qonto } from '/domain/integrations/Qonto'
import { ConfigError } from '../../Error/Config'
import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'

export interface BaseQontoActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface BaseQontoActionIntegrations {
  qonto: Qonto
}

export class BaseQontoAction<I extends object, O extends object> extends BaseAction<I, O> {
  constructor(
    config: BaseActionConfig,
    services: BaseQontoActionServices,
    protected _integrations: BaseQontoActionIntegrations
  ) {
    super(config, services)
  }

  validateConfig = async () => {
    const response = await this._integrations.qonto.checkConfiguration()
    if (response)
      return [
        new ConfigError({
          entity: 'Action',
          name: this.constructor.name,
          message: 'Qonto configuration is invalid',
        }),
      ]
    return []
  }
}
