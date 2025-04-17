import type { ConfigSchema } from '/adapter/api/schemas/ConfigSchema'
import * as Sentry from './Sentry'
import { SystemDriver } from '/infrastructure/drivers/common/SystemDriver'

export function instrument(config: ConfigSchema) {
  const system = new SystemDriver()
  if (config.services?.monitors) {
    for (const monitor of config.services.monitors) {
      if (monitor.driver === 'Sentry')
        Sentry.init({
          appName: config.name,
          appVersion: config.appVersion ?? system.getAppVersion(),
          ...monitor,
        })
    }
  }
}
