import type { MonitorSentryConfig } from '/domain/services'

/**
 * Sentry Monitor Service Schema
 * @title Sentry
 * @description Configuration for Sentry monitoring services
 */
export interface SentryMonitorServiceSchema {
  /**
   * The type of monitor configuration
   * @title Type
   * @description The type of monitor configuration
   */
  type: MonitorSentryConfig['type']
  /**
   * The Data Source Name (DSN) for Sentry
   * @title DSN
   * @description The Data Source Name (DSN) for Sentry
   */
  dsn: MonitorSentryConfig['dsn']
  /**
   * The environment name for Sentry
   * @title Environment
   * @description The environment name for Sentry
   */
  environment: MonitorSentryConfig['environment']
}
