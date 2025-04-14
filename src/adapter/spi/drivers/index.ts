import { type IDatabaseDriver } from './DatabaseSpi'
import { type IIdGeneratorDriver } from './IdGeneratorSpi'
import { type ILoggerDriver } from './LoggerSpi'
import { type ISchemaValidatorDriver } from './SchemaValidatorSpi'
import { type IServerDriver } from './ServerSpi'
import { type IQueueDriver } from './QueueSpi'
import { type ITemplateCompilerDriver } from './TemplateCompilerSpi'
import { type ICodeCompilerDriver } from './CodeCompilerSpi'
import { type ISystemDriver } from './SystemSpi'
import { type IStorageDriver } from './StorageSpi'
import { type IMonitorDriver } from './MonitorSpi'
import { type ITunnelDriver } from './TunnelSpi'
import { type IFetcherDriver } from './FetcherSpi'
import type { ICronDriver } from './CronSpi'
import type { IThemeDriver } from './ThemeSpi'

import { type ServerConfig } from '/domain/services/Server'
import { type DatabaseConfig } from '/domain/services/Database'
import { type QueueConfig } from '/domain/services/Queue'
import { type MonitorConfig } from '/domain/services/Monitor'
import { type LoggerConfig } from '/domain/services/Logger'
import { type CodeCompilerConfig } from '/domain/services/CodeCompiler'
import { type TunnelConfig } from '/domain/services/Tunnel'
import type { StorageConfig } from '/domain/services/Storage'
import type { ThemeConfig } from '/domain/services/Theme'
import type { IClientDriver } from './ClientSpi'
export interface Drivers {
  tunnel: (config?: TunnelConfig) => ITunnelDriver
  server: (config: ServerConfig) => IServerDriver
  database: (config: DatabaseConfig) => IDatabaseDriver
  queue: (config: QueueConfig) => IQueueDriver
  storage: (config: StorageConfig) => IStorageDriver
  monitor: (config: MonitorConfig[]) => IMonitorDriver
  logger: (config: LoggerConfig[]) => ILoggerDriver
  codeCompiler: (config: CodeCompilerConfig) => ICodeCompilerDriver
  theme: (config: ThemeConfig) => IThemeDriver
  idGenerator: () => IIdGeneratorDriver
  schemaValidator: () => ISchemaValidatorDriver
  templateCompiler: () => ITemplateCompilerDriver
  system: () => ISystemDriver
  fetcher: () => IFetcherDriver
  cron: () => ICronDriver
  client: () => IClientDriver
}
