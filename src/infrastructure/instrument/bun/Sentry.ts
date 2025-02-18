import type { MonitorSentryConfig } from '/domain/services/Monitor'
import * as Sentry from '@sentry/bun'
import slugify from 'slugify'

export function init(config: MonitorSentryConfig) {
  Sentry.init({
    release: `${slugify(config.appName)}@${config.appVersion}`,
    dsn: config.dsn,
    environment: config.environment,
    tracesSampleRate: 1.0,
  })
}
