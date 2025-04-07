import type { ConfigError } from '/domain/entities/Error/Config'
import {
  BaseApp,
  type AppConfig,
  type AppEntities,
  type AppIntegrations,
  type AppServices,
} from './Base'
import { StartedApp } from './Started'

export class StoppedApp extends BaseApp {
  constructor(
    config: AppConfig,
    services: AppServices,
    entities: AppEntities,
    integrations: AppIntegrations
  ) {
    super(config, services, entities, integrations)
    this._setStatus('stopped')
  }

  init = async (): Promise<void> => {
    const { server, theme, client } = this._services
    const { tables, automations, buckets, forms } = this._entities
    const { notion } = this._integrations
    await server.init(async () => {
      if (this._config.integrations?.notion) await notion.init()
      for (const table of tables) await table.init()
      for (const automation of automations) await automation.init()
      for (const bucket of buckets) await bucket.init()
      for (const form of forms) await form.init()
      if (forms.length > 0) await theme.init()
      await client.init()
    })
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    await this.init()
    const { tables, automations, buckets, forms } = this._entities
    const errors: Promise<ConfigError[]>[] = []
    errors.push(...tables.map((table) => table.validateConfig()))
    errors.push(...buckets.map((bucket) => bucket.validateConfig()))
    errors.push(...automations.map((automation) => automation.validateConfig()))
    errors.push(...forms.map((form) => form.validateConfig()))
    return Promise.all(errors).then((errors) => errors.flat())
  }

  start = async ({ isTest = false } = {}): Promise<StartedApp> => {
    if (this._status !== 'stopped')
      throw new Error(`App is not stopped, current status is ${this._status}`)
    this._setStatus('starting')
    const { server, database, queue, storage, realtime, logger, monitor } = this._services
    const { tables } = this._entities
    const { notion } = this._integrations
    await database.connect()
    await database.migrate(tables)
    await queue.start()
    await storage.connect()
    await storage.migrate()
    await realtime.setup()
    await notion.startPolling()
    await server.start()
    const startedApp = new StartedApp(
      this._config,
      this._services,
      this._entities,
      this._integrations,
      isTest
    )
    if (!isTest && server.env === 'production') {
      database.onError(async () => {
        if (this._status === 'started') {
          await startedApp.stop({ graceful: false })
        }
      })
      process.on('SIGTERM', () => startedApp.onClose('SIGTERM'))
      process.on('SIGINT', () => startedApp.onClose('SIGINT'))
      process.on('uncaughtException', (error: Error) => {
        monitor.captureException(error)
        startedApp.onClose('UNCAUGHT_EXCEPTION')
      })
      process.on('unhandledRejection', (reason: Error) => {
        monitor.captureException(reason)
        startedApp.onClose('UNCAUGHT_REJECTION')
      })
    }
    logger.info(`🚀 App "${this.name}" started at ${startedApp.url}`)
    logger.info(`⚙️ Config version: ${this.version}`)
    logger.info(`⚙️ Engine version: ${this.engine}`)
    logger.info(`🔗 Open API documentation available at ${startedApp.url}/api/docs`)
    return startedApp
  }
}
