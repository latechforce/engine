import type { ConfigSchema } from '../../../adapter/api/schemas/ConfigSchema'
import * as Sentry from './Sentry'
import { SystemDriver } from '/infrastructure/drivers/common/SystemDriver'
import { Engine } from '/adapter/api'

export function instrument(config: ConfigSchema) {
  const filledConfig = Engine.fillEnv(config) as ConfigSchema
  const system = new SystemDriver()
  if (filledConfig.services?.monitors) {
    for (const monitor of filledConfig.services.monitors) {
      if (monitor.type === 'Sentry')
        Sentry.init({
          appName: config.name,
          appVersion: config.appVersion ?? system.getAppVersion(),
          ...monitor,
        })
    }
  }
}
