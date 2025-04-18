import { StoppedApp } from '/domain/entities/App/Stopped'
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
import { PhantombusterMapper } from './Integration/PhantombusterMapper'
import { FormMapper } from './FormMapper'
import { ThemeMapper } from './Services/ThemeMapper'
import { ClientMapper } from './Services/ClientMapper'
import type { Components } from '/domain/components'
import { SystemMapper } from './Services/SystemMapper'
import { CalendlyMapper } from './Integration/CalendlyMapper'
import type { ConfigSchema } from '../schemas/ConfigSchema'
import { JotformMapper } from './Integration/JotformMapper'
import { YouCanBookMeMapper } from './Integration/YouCanBookMeMapper'
import { Admin } from '/domain/entities/Admin'

export class AppMapper {
  static toEntity = (
    drivers: Drivers,
    integrations: Integrations,
    components: Components,
    schema: ConfigSchema
  ) => {
    const timestamp = Date.now().toString()
    const system = SystemMapper.toService(drivers)
    const appVersion = schema.appVersion ?? system.getAppVersion()
    const engineVersion = schema.engineVersion ?? system.getEngineVersion()
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
    const buckets = BucketMapper.toManyEntities(schema.buckets, {
      server,
      storage,
      idGenerator,
      templateCompiler,
      system,
    })
    const tables = TableMapper.toManyEntities(schema.tables, {
      database,
      server,
      idGenerator,
      templateCompiler,
      schemaValidator,
      monitor,
      storage,
      system,
    })
    const realtime = RealtimeMapper.toService({ database, logger, idGenerator }, { tables })
    const notion = NotionMapper.toIntegration(
      integrations,
      { idGenerator, logger, storage, server, templateCompiler, fetcher, system, schemaValidator },
      schema.integrations?.notion
    )
    const calendly = CalendlyMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.calendly
    )
    const airtable = AirtableMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.airtable
    )
    const pappers = PappersMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.pappers
    )
    const qonto = QontoMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.qonto
    )
    const jotform = JotformMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.jotform
    )
    const youcanbookme = YouCanBookMeMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.youcanbookme
    )
    const phantombuster = PhantombusterMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.phantombuster
    )
    const googleMail = GoogleMailMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.google?.mail
    )
    const gocardless = GoCardlessMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema.integrations?.gocardless
    )
    const javascriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger, fetcher },
      { tables },
      { notion, airtable, qonto, gocardless, pappers, phantombuster },
      { language: 'JavaScript' }
    )
    const typescriptCompiler = CodeCompilerMapper.toService(
      drivers,
      { logger, fetcher },
      { tables },
      { notion, airtable, qonto, gocardless, pappers, phantombuster },
      { language: 'TypeScript' }
    )
    const automations = AutomationMapper.toManyEntities(
      schema.automations,
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
        system,
      },
      { tables },
      { notion, pappers, qonto, googleMail, gocardless, calendly, jotform, youcanbookme }
    )
    const forms = FormMapper.toManyEntities(
      schema.forms?.map((form) => ({ ...form, timestamp })),
      { server, idGenerator, client, logger, system, theme },
      { tables },
      components
    )
    const admin = new Admin({ server, theme, client, system }, components, {
      notion,
      calendly,
      airtable,
      pappers,
      qonto,
      jotform,
      youcanbookme,
      phantombuster,
      googleMail,
      gocardless,
    })
    return new StoppedApp(
      {
        name: schema.name,
        appVersion,
        engineVersion,
        description: schema.description,
        integrations: schema.integrations,
        services: {
          server: server.config,
          database: database.config,
          monitors: monitor.config,
          tunnel: tunnel.config,
          theme: theme.config,
        },
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
        theme,
      },
      {
        tables,
        automations,
        buckets,
        forms,
        admin,
      },
      {
        notion,
        calendly,
        airtable,
        pappers,
        qonto,
        jotform,
        youcanbookme,
        phantombuster,
        googleMail,
        gocardless,
      }
    )
  }
}
