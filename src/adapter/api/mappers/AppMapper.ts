import { StoppedApp } from '/domain/entities/App/Stopped'
import type { Drivers } from '/adapter/spi/drivers'
import { TableMapper } from './TableMapper'
import { AutomationMapper } from './AutomationMapper'
import { RealtimeMapper } from './ServicesMapper/RealtimeMapper'
import { CodeCompilerMapper } from './ServicesMapper/CodeCompilerMapper'
import { BucketMapper } from './BucketMapper'
import type { Integrations } from '/adapter/spi/integrations'
import { FormMapper } from './FormMapper'
import type { Components } from '/domain/components'
import type { ConfigSchema } from '../schemas/ConfigSchema'
import { Admin } from '/domain/entities/Admin'
import { IntegrationsMapper } from './IntegrationsMapper'
import { ServicesMapper } from './ServicesMapper'
import { SystemMapper } from './ServicesMapper/SystemMapper'

export class AppMapper {
  static toEntity = (
    drivers: Drivers,
    integrations: Integrations,
    components: Components,
    schema: ConfigSchema
  ) => {
    const system = SystemMapper.toService(drivers)
    const appVersion = schema.appVersion ?? system.getAppVersion()
    const engineVersion = schema.engineVersion ?? system.getEngineVersion()
    const {
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
    } = ServicesMapper.toEntities(drivers, schema, { appVersion })
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
    const {
      notion,
      airtable,
      qonto,
      gocardless,
      pappers,
      phantombuster,
      calendly,
      jotform,
      youcanbookme,
      googleMail,
    } = IntegrationsMapper.toEntities(
      integrations,
      {
        idGenerator,
        logger,
        storage,
        server,
        templateCompiler,
        fetcher,
        system,
        schemaValidator,
        database,
      },
      schema.integrations
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
      schema.forms,
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
