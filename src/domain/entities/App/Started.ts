import type {
  CodeRunnerContextIntegrations,
  CodeRunnerContextServices,
} from '/domain/services/CodeRunner'
import {
  BaseApp,
  type AppConfig,
  type AppEntities,
  type AppIntegrations,
  type AppServices,
} from './Base'
import { StoppedApp } from './Stopped'

export class StartedApp extends BaseApp {
  constructor(
    config: AppConfig,
    services: AppServices,
    entities: AppEntities,
    integrations: AppIntegrations
  ) {
    super(config, services, entities, integrations)
    this._setStatus('started')
  }

  get url() {
    const url = this._services.server.baseUrl
    if (!url) throw new Error('server url is not defined')
    return url
  }

  get integrations(): CodeRunnerContextIntegrations {
    const { codeCompiler } = this._services
    return codeCompiler.getIntegrations()
  }

  get services(): CodeRunnerContextServices {
    const { codeCompiler } = this._services
    return codeCompiler.getServices()
  }

  get queue() {
    return this._services.queue
  }

  stop = async (options?: { graceful?: boolean }): Promise<StoppedApp> => {
    if (this._status === 'started') {
      const { graceful = true } = options || {}
      this._setStatus('stopping')
      const { server, database, queue, cron, storage } = this._services
      const { notion } = this._integrations
      await server.stop(async () => {
        cron.stopAll()
        await notion.stopPolling()
        await queue.stop({ graceful })
        await database.disconnect()
        await storage.disconnect()
      })
    }
    const stoppedApp = new StoppedApp(
      this.config,
      this._services,
      this._entities,
      this._integrations
    )
    this.logger.info(`🛑 app "${this.config.name}" stopped`)
    return stoppedApp
  }

  onClose = async (signal: 'SIGTERM' | 'SIGINT' | 'UNCAUGHT_EXCEPTION' | 'UNCAUGHT_REJECTION') => {
    this.logger.debug(`app received signal ${signal}`)
    await this.stop()
    process.exit(1)
  }
}
