import type { MonitorConsoleConfig, MonitorSentryConfig } from '/domain/services'

/**
 * Monitor config
 * @title Monitor
 * @description The monitor config for the engine
 */
export type MonitorServiceSchema =
  | Omit<MonitorSentryConfig, 'appName' | 'appVersion'>
  | MonitorConsoleConfig
