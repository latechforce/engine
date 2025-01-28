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

export class AppMapper {
  static toEntity = (drivers: Drivers, integrations: Integrations, config: Config) => {
    const { name } = config
    const monitor = MonitorMapper.toService(drivers, config.monitors)
    const logger = LoggerMapper.toService(drivers, config.loggers)
    const tunnel = TunnelMapper.toService(drivers, config.tunnel)
    const server = ServerMapper.toService(drivers, config.server, { logger, monitor, tunnel })
    const idGenerator = IdGeneratorMapper.toService(drivers)
    const fetcher = FetcherMapper.toService(drivers)
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
    const javascriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger },
      { tables },
      { notion, airtable },
      { language: 'JavaScript' }
    )
    const typescriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger },
      { tables },
      { notion, airtable },
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
        schemaValidator,
        javascriptCompiler,
        typescriptCompiler,
        monitor,
        database,
      },
      { tables },
      { notion, pappers, qonto }
    )
    return new StoppedApp(
      {
        name,
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
