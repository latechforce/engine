import type { MonitorSentryConfig } from '/domain/services/Monitor'
import * as Sentry from '@sentry/bun'
import slugify from 'slugify'

export function init(config: MonitorSentryConfig) {
  const release = `${slugify(config.appName, { lower: true })}@${config.appVersion}`
  Sentry.init({
    release,
    dsn: config.dsn,
    environment: config.environment,
    tracesSampleRate: 1.0,
  })
  console.log('Sentry has been successfully initialized')
}
