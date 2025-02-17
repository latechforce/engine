import type { Drivers } from '/adapter/spi/drivers'
import type { QueueConfig } from '/domain/services/Queue'
import type { StorageConfig } from '/domain/services/Storage'
import type { LoggersConfig } from '/domain/services/Logger'
import type { CodeCompilerConfig } from '/domain/services/CodeCompiler'
import type { TunnelConfig } from '/domain/services/Tunnel'

import { StorageDriver } from './StorageDriver'
import { SchemaValidatorDriver } from './SchemaValidatorDriver'
import { LoggerDriver } from './LoggerDriver'
import { IdGeneratorDriver } from './IdGeneratorDriver'
import { QueueDriver } from './QueueDriver'
import { TemplateCompilerDriver } from './TemplateCompilerDriver'
import { CodeCompilerDriver } from './CodeCompilerDriver'
import { FileSystemDriver } from './FileSystemDriver'
import { TunnelDriver } from './TunnelDriver'
import { FetcherDriver } from './FetcherDriver'
import { CronDriver } from './CronDriver'

export const drivers: Omit<Drivers, 'database' | 'monitor' | 'server'> = {
  tunnel: (config?: TunnelConfig) => new TunnelDriver(config),
  queue: (config: QueueConfig) => new QueueDriver(config),
  storage: (config: StorageConfig) => new StorageDriver(config),
  logger: (config: LoggersConfig) => new LoggerDriver(config),
  codeCompiler: (config: CodeCompilerConfig) => new CodeCompilerDriver(config),
  templateCompiler: () => new TemplateCompilerDriver(),
  schemaValidator: () => new SchemaValidatorDriver(),
  idGenerator: () => new IdGeneratorDriver(),
  fileSystem: () => new FileSystemDriver(),
  fetcher: () => new FetcherDriver(),
  cron: () => new CronDriver(),
}
