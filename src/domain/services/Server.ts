import type { Logger } from './Logger'
import type { GetRequest } from '../entities/Request/Get'
import type { PostRequest } from '../entities/Request/Post'
import type { Response } from '../entities/Response'
import { JsonResponse } from '../entities/Response/Json'
import type { PatchRequest } from '/domain/entities/Request/Patch'
import type { DeleteRequest } from '/domain/entities/Request/Delete'
import type { Request } from '/domain/entities/Request'
import type { Monitor, MonitorType } from './Monitor'
import type { Tunnel } from './Tunnel'
import type { SchemaValidatorJson } from './SchemaValidator'

export interface ServerConfig {
  appName: string
  appVersion: string
  appDescription?: string
  apiKeys?: string[]
  port?: string | number
  idleTimeout?: string | number
  baseUrl?: string
  sslCert?: string
  sslKey?: string
  monitors?: MonitorType[]
}

export interface ServerServices {
  logger: Logger
  monitor: Monitor
  tunnel: Tunnel
}

export type ServerMethodOptionsAuth = 'ApiKey'

export interface ServerMethodOptions {
  auth?: ServerMethodOptionsAuth
  body?: SchemaValidatorJson
  response?: SchemaValidatorJson
  detail?: {
    description?: string
    tags?: ('Automation' | 'Webhook' | 'Table')[]
  }
}

export interface IServerSpi {
  findAvailablePort: () => Promise<number>
  start: (port: number) => Promise<number>
  stop: () => Promise<void>
  get: (
    path: string,
    handler: (request: GetRequest) => Promise<Response>,
    options: ServerMethodOptions
  ) => Promise<void>
  post: (
    path: string,
    handler: (request: PostRequest) => Promise<Response>,
    options: ServerMethodOptions
  ) => Promise<void>
  patch: (
    path: string,
    handler: (request: PatchRequest) => Promise<Response>,
    options: ServerMethodOptions
  ) => Promise<void>
  delete: (
    path: string,
    handler: (request: DeleteRequest) => Promise<Response>,
    options: ServerMethodOptions
  ) => Promise<void>
  notFound: (handler: (request: Request) => Promise<Response>) => Promise<void>
}

export class Server {
  isListening: boolean = false
  isShuttingDown: boolean = false
  getHandlers: string[] = []
  postHandlers: string[] = []
  notFoundHandler?: () => Promise<void>
  private _baseUrl?: string
  private _port?: number

  constructor(
    private _spi: IServerSpi,
    private _services: ServerServices,
    public config: ServerConfig
  ) {
    this._baseUrl = config.baseUrl
    this._port = config.port ? Number(config.port) : undefined
  }

  get baseUrl() {
    if (!this._baseUrl) throw new Error('baseUrl is not set')
    return this._baseUrl
  }

  get port() {
    if (!this._port) throw new Error('port is not set')
    return this._port
  }

  init = async (callback: () => Promise<void>) => {
    const { logger } = this._services
    if (!this._port) {
      logger.debug('finding available port...')
      this._port = await this._spi.findAvailablePort()
    }
    if (!this._baseUrl) this._baseUrl = `http://localhost:${this._port}`
    logger.debug('initializing server routes...')
    await this.get('/api/health', async () => new JsonResponse({ success: true }))
    await callback()
    await this.notFound()
  }

  get = async (
    path: string,
    handler: (request: GetRequest) => Promise<Response>,
    options: ServerMethodOptions = {}
  ) => {
    const { logger } = this._services
    await this._spi.get(
      path,
      async (request: GetRequest) => {
        logger.http(`GET ${path}`, request.toJson())
        return handler(request)
      },
      options
    )
    this.getHandlers.push(path)
    logger.debug(`add GET handler ${path}`)
  }

  post = async (
    path: string,
    handler: (request: PostRequest) => Promise<Response>,
    options: ServerMethodOptions = {}
  ) => {
    const { logger } = this._services
    await this._spi.post(
      path,
      async (request: PostRequest) => {
        logger.http(`POST ${path}`, request.toJson())
        return handler(request)
      },
      options
    )
    this.postHandlers.push(path)
    logger.debug(`add POST handler ${path}`)
  }

  patch = async (
    path: string,
    handler: (request: PatchRequest) => Promise<Response>,
    options: ServerMethodOptions = {}
  ) => {
    const { logger } = this._services
    await this._spi.patch(
      path,
      async (request: PatchRequest) => {
        logger.http(`PATCH ${path}`, request.toJson())
        return handler(request)
      },
      options
    )
    logger.debug(`add PATCH handler ${path}`)
  }

  delete = async (
    path: string,
    handler: (request: DeleteRequest) => Promise<Response>,
    options: ServerMethodOptions = {}
  ) => {
    const { logger } = this._services
    await this._spi.delete(
      path,
      async (request: DeleteRequest) => {
        logger.http(`DELETE ${path}`, request.toJson())
        return handler(request)
      },
      options
    )
    logger.debug(`add DELETE handler ${path}`)
  }

  notFound = async () => {
    const { logger } = this._services
    await this._spi.notFound(async (request: Request) => {
      logger.http(`404 ${request.path}`)
      if (request.path.startsWith('/api/table/')) {
        const table = request.path.split('/').pop()
        return new JsonResponse({ error: `Table "${table}" not found` }, 404)
      }
      return new JsonResponse({ error: 'Not found' }, 404)
    })
    logger.debug(`add 404 handler`)
  }

  start = async (): Promise<string> => {
    const { logger, tunnel } = this._services
    logger.debug(`starting server...`)
    await this._spi.start(this.port)
    this._baseUrl = await tunnel.start(this.port)
    this.isListening = true
    logger.debug(`server listening at ${this.baseUrl}`)
    return this.baseUrl
  }

  stop = async (callback: () => Promise<void>) => {
    const { logger, monitor, tunnel } = this._services
    logger.debug(`closing server...`)
    this.isShuttingDown = true
    this.isListening = false
    try {
      await callback()
    } catch (error) {
      if (error instanceof Error) {
        monitor.captureException(error)
      } else throw error
    } finally {
      await tunnel.stop()
      await this._spi.stop()
      this.isShuttingDown = false
      logger.debug('server closed')
    }
  }

  hasGetHandler = (path: string) => {
    return this.getHandlers.includes(path)
  }

  hasPostHandler = (path: string) => {
    return this.postHandlers.includes(path)
  }
}
