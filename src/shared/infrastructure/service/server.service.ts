// External packages
import { Hono, type Context, type Handler, type MiddlewareHandler } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { inject, injectable } from 'inversify'
import { Scalar } from '@scalar/hono-api-reference'
import { OpenAPIHono, createRoute, type RouteConfig } from '@hono/zod-openapi'
import type { HTTPResponseError } from 'hono/types'
import { timeout } from 'hono/timeout'

// Internal types
import type { App } from '@/app/domain/entity/app.entity'
import type { HonoContextType } from '@/shared/infrastructure/di/context'

// Internal services and constants
import TYPES from '../../application/di/types'
import type { EnvService } from './env.service'
import type { LoggerService } from './logger.service'
import index from '../index.html'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import { TriggerError } from '@/trigger/domain/entity/trigger-error.entity'

export type HonoType = { Variables: HonoContextType }

@injectable()
export class ServerService {
  public readonly server: Hono<HonoType>
  private readonly openapiServer: OpenAPIHono<HonoType>

  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Hono.Routes)
    private readonly apiRoutes: Hono<HonoType>
  ) {
    this.logger = this.logger.child('server-service')
    this.logger.debug('init server')
    this.server = new Hono<HonoType>()
    this.openapiServer = new OpenAPIHono<HonoType>()
    this.server.use(secureHeaders())
    this.server.use(trimTrailingSlash())
    this.server.use(prettyJSON())
    this.server.use('/api', timeout(30000))
    this.server.onError((error, c) => this.onError(error, c))
  }

  use(middleware: MiddlewareHandler) {
    this.server.use(middleware)
  }

  on(methods: string[], path: string, handler: Handler) {
    this.server.on(methods, path, handler)
  }

  onError(error: Error | HTTPResponseError, c: Context<HonoType>) {
    this.logger.error(error instanceof Error ? error.message : 'Unknown error')
    if (error instanceof TriggerError) {
      return c.json({ error: error.message, success: false }, error.status)
    } else if (error instanceof HttpError) {
      return c.json({ error: error.message }, error.status)
    }
    return c.json({ error: error.message }, 500)
  }

  addOpenAPIRoute(routeConfig: RouteConfig) {
    const route = createRoute(routeConfig)
    this.openapiServer.openapi(route, (c) => {
      return c.json({}, 200)
    })
  }

  addOpenAPIDoc(app: App) {
    this.openapiServer.doc('/schema', {
      openapi: '3.0.0',
      info: {
        title: app.schema.name,
        version: app.schema.version,
        description: app.schema.description,
      },
      servers: [
        {
          url: this.env.get('BASE_URL') + '/api',
          description: this.env.get('NODE_ENV') === 'development' ? 'Local server' : undefined,
        },
      ],
    })
    this.openapiServer.get('/scalar', Scalar({ url: '/openapi/schema', theme: 'alternate' }))
  }

  start() {
    this.server.route('/openapi', this.openapiServer)
    this.server.route('/api', this.apiRoutes)
    Bun.serve({
      routes: {
        '/openapi/*': {
          GET: this.server.fetch,
        },
        '/api/*': {
          GET: this.server.fetch,
          POST: this.server.fetch,
        },
        '/*': {
          GET: index,
        },
      },
      port: Number(this.env.get('PORT')),
      development: this.env.get('NODE_ENV') !== 'production',
    })
  }
}
