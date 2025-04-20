import { DatabaseMapper } from './DatabaseMapper'
import { ClientMapper } from './ClientMapper'
import { CronMapper } from './CronMapper'
import type { ConfigSchema } from '../../schemas/ConfigSchema'
import { FetcherMapper } from './FetcherMapper'
import { IdGeneratorMapper } from './IdGeneratorMapper'
import { LoggerMapper } from './LoggerMapper'
import { ServerMapper } from './ServerMapper'
import type { Drivers } from '/adapter/spi/drivers'
import { SchemaValidatorMapper } from './SchemaValidatorMapper'
import { TemplateCompilerMapper } from './TemplateCompilerMapper'
import { ThemeMapper } from './ThemeMapper'
import { QueueMapper } from './QueueMapper'
import { StorageMapper } from './StorageMapper'
import { MonitorMapper } from './MonitorMapper'
import { TunnelMapper } from './TunnelMapper'

export class ServicesMapper {
  static toEntities(
    drivers: Drivers,
    schema: ConfigSchema,
    { appVersion }: { appVersion: string }
  ) {
    const logger = LoggerMapper.toService(drivers, schema.services?.loggers)
    const monitor = MonitorMapper.toService(
      drivers,
      schema.services?.monitors,
      { logger },
      { appName: schema.name, appVersion }
    )
    const tunnel = TunnelMapper.toService(drivers, schema.services?.tunnel)
    const server = ServerMapper.toService(
      drivers,
      schema.services?.server,
      { logger, monitor, tunnel },
      { appName: schema.name, appVersion, appDescription: schema.description }
    )
    const idGenerator = IdGeneratorMapper.toService(drivers)
    const fetcher = FetcherMapper.toService(drivers)
    const cron = CronMapper.toService(drivers)
    const client = ClientMapper.toService(drivers, { server, logger })
    const theme = ThemeMapper.toService(drivers, { server, logger, client }, schema.services?.theme)
    const schemaValidator = SchemaValidatorMapper.toService(drivers)
    const templateCompiler = TemplateCompilerMapper.toService(drivers)
    const database = DatabaseMapper.toService(drivers, schema.services?.database, {
      logger,
      monitor,
      idGenerator,
    })
    const queue = QueueMapper.toService(drivers, { logger, database, monitor })
    const storage = StorageMapper.toService(drivers, { logger, database })
    return {
      server,
      database,
      logger,
      monitor,
      tunnel,
      theme,
      client,
      cron,
      fetcher,
      idGenerator,
      queue,
      schemaValidator,
      templateCompiler,
      storage,
    }
  }
}
