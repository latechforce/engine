import type { Pappers } from '../../../../integrations/Pappers'
import { type BaseActionServices } from '../../base'
import type { TemplateCompiler } from '../../../../services/TemplateCompiler'
import { BaseIntegrationAction, type BaseActionIntegrationConfig } from '../base'

export interface BasePappersActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface BasePappersActionIntegrations {
  pappers: Pappers
}

export class BasePappersAction<I extends object, O extends object> extends BaseIntegrationAction<
  I,
  O
> {
  constructor(
    protected _config: BaseActionIntegrationConfig,
    services: BasePappersActionServices,
    protected _integrations: BasePappersActionIntegrations
  ) {
    super(_config, services)
  }

  validate = async () => {
    const { pappers } = this._integrations
    const { account } = this._config
    return pappers.validate({ account, entity: 'Action', name: this.constructor.name })
  }
}
