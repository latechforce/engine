import type { AutomationContext } from '../Automation/Context'
import type { ConfigError } from '../Error/Config'

export interface BaseTriggerConfig {
  automation: string
}

export interface BaseTrigger {
  init: (run: (triggerData: object) => Promise<AutomationContext>) => Promise<void>
  validateConfig: () => Promise<ConfigError[]>
}
