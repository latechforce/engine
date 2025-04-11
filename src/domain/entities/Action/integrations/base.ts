import type { ConfigError } from '../../Error/Config'
import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'

export interface BaseActionIntegrationConfig extends BaseActionConfig {
  account: string
}

export class BaseIntegrationAction<Input extends object, Output extends object> extends BaseAction<
  Input,
  Output
> {
  constructor(config: BaseActionConfig, services: BaseActionServices) {
    super(config, services)
  }

  validate = async (): Promise<ConfigError[]> => {
    throw new Error('Method not implemented.')
  }
}
