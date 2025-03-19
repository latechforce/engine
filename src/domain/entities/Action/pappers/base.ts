import type { Pappers } from '/domain/integrations/Pappers'
import { ConfigError } from '../../Error/Config'
import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'

export interface BasePappersActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface BasePappersActionIntegrations {
  pappers: Pappers
}

export class BasePappersAction<I extends object, O extends object> extends BaseAction<I, O> {
  constructor(
    config: BaseActionConfig,
    services: BasePappersActionServices,
    protected _integrations: BasePappersActionIntegrations
  ) {
    super(config, services)
  }

  validateConfig = async () => {
    const response = await this._integrations.pappers.checkConfiguration()
    if (response)
      return [
        new ConfigError({
          entity: 'Action',
          name: this.constructor.name,
          message: 'Pappers configuration is invalid',
        }),
      ]
    return []
  }
}
