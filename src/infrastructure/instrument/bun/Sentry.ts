import type { MonitorSentryConfig } from '/domain/services/Monitor'
import * as Sentry from '@sentry/bun'

export function init(config: MonitorSentryConfig) {
  Sentry.init({
    release: `${config.appName}@${config.appVersion}`,
    dsn: config.dsn,
    environment: config.environment,
    tracesSampleRate: 1.0,
  })
}
