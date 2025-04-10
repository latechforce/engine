import type { AutomationContext } from '../Automation/Context'
import type { ConfigError } from '../Error/Config'

export interface BaseTriggerConfig {
  automation: string
}

export interface BaseTriggerIntegrationConfig extends BaseTriggerConfig {
  account: string
}

export class BaseTrigger<T extends BaseTriggerConfig> {
  constructor(protected _config: T) {}

  validate = async (): Promise<ConfigError[]> => {
    return []
  }

  init = async (_run: (triggerData: object) => Promise<AutomationContext>): Promise<void> => {
    throw new Error('Not implemented')
  }
}
