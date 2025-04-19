import type { ConsoleMonitorServiceSchema } from './ConsoleSchema'
import type { SentryMonitorServiceSchema } from './SentrySchema'

/**
 * Monitor configuration interface
 * @title Monitor
 * @description Configuration for monitoring services, supporting both Sentry and Console monitoring
 */
export type MonitorServiceSchema = SentryMonitorServiceSchema | ConsoleMonitorServiceSchema
