import type { ConfigSchema } from '/adapter/api/schemas/ConfigSchema'
import * as Sentry from './Sentry'

export function instrument(config: ConfigSchema) {
  if (config.monitors) {
    for (const monitor of config.monitors) {
      if (monitor.driver === 'Sentry')
        Sentry.init({
          appName: config.name,
          appVersion: config.version,
          ...monitor,
        })
    }
  }
}
