import { StoppedApp } from '/domain/entities/App/Stopped'
import type { Config } from '/domain/interfaces'
import type { Drivers } from '/adapter/spi/drivers'
import { TableMapper } from './TableMapper'
import { AutomationMapper } from './AutomationMapper'
import { ServerMapper } from './Services/ServerMapper'
import { IdGeneratorMapper } from './Services/IdGeneratorMapper'
import { TemplateCompilerMapper } from './Services/TemplateCompilerMapper'
import { LoggerMapper } from './Services/LoggerMapper'
import { DatabaseMapper } from './Services/DatabaseMapper'
import { QueueMapper } from './Services/QueueMapper'
import { RealtimeMapper } from './Services/RealtimeMapper'
import { SchemaValidatorMapper } from './Services/SchemaValidatorMapper'
import { CodeCompilerMapper } from './Services/CodeCompilerMapper'
import { StorageMapper } from './Services/StorageMapper'
import { BucketMapper } from './BucketMapper'
import { MonitorMapper } from './Services/MonitorMapper'
import { NotionMapper } from './Integration/NotionMapper'
import type { Integrations } from '/adapter/spi/integrations'
import { PappersMapper } from './Integration/PappersMapper'
import { QontoMapper } from './Integration/QontoMapper'
import { TunnelMapper } from './Services/TunnelMapper'
import { FetcherMapper } from './Services/FetcherMapper'
import { AirtableMapper } from './Integration/AirtableMapper'
import { GoogleMailMapper } from './Integration/GoogleMailMapper'
import { CronMapper } from './Services/CronMapper'
import { GoCardlessMapper } from './Integration/GoCardlessMapper'

export class AppMapper {
  static toEntity = (drivers: Drivers, integrations: Integrations, config: Config) => {
    const { name: appName, version: appVersion, description: appDescription } = config
    const monitor = MonitorMapper.toService(
      drivers,
      config.monitors?.map((monitor) => ({ ...monitor, appName, appVersion }))
    )
    const logger = LoggerMapper.toService(drivers, config.loggers)
    const tunnel = TunnelMapper.toService(drivers, config.tunnel)
    const server = ServerMapper.toService(
      drivers,
      { ...config.server, appName, appVersion, appDescription },
      { logger, monitor, tunnel }
    )
    const idGenerator = IdGeneratorMapper.toService(drivers)
    const fetcher = FetcherMapper.toService(drivers)
    const cron = CronMapper.toService(drivers)
    const schemaValidator = SchemaValidatorMapper.toService(drivers)
    const templateCompiler = TemplateCompilerMapper.toService(drivers)
    const database = DatabaseMapper.toService(drivers, config.database, {
      logger,
      monitor,
      idGenerator,
    })
    const queue = QueueMapper.toService(drivers, { logger, database, monitor })
    const storage = StorageMapper.toService(drivers, { logger, database })
    const buckets = BucketMapper.toManyEntities(config.buckets, {
      server,
      storage,
      idGenerator,
      templateCompiler,
    })
    const tables = TableMapper.toManyEntities(config.tables, {
      database,
      server,
      idGenerator,
      templateCompiler,
      schemaValidator,
      monitor,
    })
    const realtime = RealtimeMapper.toService({ database, logger, idGenerator }, { tables })
    const notion = NotionMapper.toIntegration(
      integrations,
      { idGenerator, logger, storage, server, templateCompiler, fetcher },
      config.integrations?.notion
    )
    const airtable = AirtableMapper.toIntegration(integrations, config.integrations?.airtable)
    const pappers = PappersMapper.toIntegration(integrations, config.integrations?.pappers)
    const qonto = QontoMapper.toIntegration(integrations, config.integrations?.qonto)
    const googleMail = GoogleMailMapper.toIntegration(
      integrations,
      config.integrations?.google?.mail
    )
    const gocardless = GoCardlessMapper.toIntegration(integrations, config.integrations?.gocardless)
    const javascriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger, fetcher },
      { tables },
      { notion, airtable, qonto, gocardless },
      { language: 'JavaScript' }
    )
    const typescriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger, fetcher },
      { tables },
      { notion, airtable, qonto, gocardless },
      { language: 'TypeScript' }
    )
    const automations = AutomationMapper.toManyEntities(
      config.automations,
      {
        logger,
        queue,
        realtime,
        server,
        idGenerator,
        templateCompiler,
        javascriptCompiler,
        typescriptCompiler,
        monitor,
        database,
        cron,
      },
      { tables },
      { notion, pappers, qonto, googleMail, gocardless }
    )
    return new StoppedApp(
      {
        name: appName,
        integrations: config.integrations,
      },
      {
        server,
        logger,
        database,
        queue,
        realtime,
        storage,
        monitor,
        codeCompiler: typescriptCompiler,
        cron,
      },
      {
        tables,
        automations,
        buckets,
      },
      { notion }
    )
  }
}
