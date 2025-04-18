import type { ConfigError } from '/domain/entities/Error/Config'
import { BaseApp, type AppConfig, type AppEntities, type AppServices } from './Base'
import { StartedApp } from './Started'
import type { Integrations } from '/domain/integrations'

export class StoppedApp extends BaseApp {
  constructor(
    config: AppConfig,
    services: AppServices,
    entities: AppEntities,
    integrations: Integrations
  ) {
    super(config, services, entities, integrations)
  }

  validate = async (): Promise<void> => {
    const { tables, automations, buckets, forms } = this._entities
    const promises: Promise<ConfigError[]>[] = []
    promises.push(...tables.map((table) => table.validate()))
    promises.push(...buckets.map((bucket) => bucket.validate()))
    promises.push(...automations.map((automation) => automation.validate()))
    promises.push(...forms.map((form) => form.validate()))
    const errors = await Promise.all(promises).then((results) => results.flat())
    if (errors.length > 0) {
      this.logger.error('❌ config schema is invalid', { errors })
      throw new Error(JSON.stringify(errors, null, 2))
    }
    this.logger.debug('✅ config schema is valid')
  }

  init = async (): Promise<void> => {
    const { server, theme } = this._services
    const { tables, automations, buckets, forms, admin } = this._entities
    const integrations = Object.values(this._integrations)
    await server.init(async () => {
      for (const integration of integrations) await integration.init()
      for (const table of tables) await table.init()
      for (const automation of automations) await automation.init()
      for (const bucket of buckets) await bucket.init()
      for (const form of forms) await form.init()
      await admin.init()
      await theme.init()
    })
    this.logger.debug('✅ app is initialized')
  }

  start = async (): Promise<StartedApp> => {
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
      this.config,
      this._services,
      this._entities,
      this._integrations
    )
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
    logger.info(`🚀 App "${this.config.name}" started at ${startedApp.url}`)
    logger.info(`⚙️  App version: ${this.config.appVersion}`)
    logger.info(`⚙️  Engine version: ${this.config.engineVersion}`)
    logger.info(`🔗 Open API documentation available at ${startedApp.url}/api/docs`)
    return startedApp
  }
}
