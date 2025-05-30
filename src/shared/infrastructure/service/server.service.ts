import { secureHeaders } from 'hono/secure-headers'
import TYPES from '../../application/di/types'
import type { LoggerService } from './logger.service'
import { Hono, type Handler, type MiddlewareHandler } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { inject, injectable } from 'inversify'
import index from '@/shared/client/index.html'
import type { EnvService } from './env.service'
import type { App } from '@/app/domain/entity/app.entity'
import { Scalar } from '@scalar/hono-api-reference'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { join } from 'path'
import { prettyJSON } from 'hono/pretty-json'
import type { SchemaObject } from 'ajv'
import type { HonoContextType } from '@/shared/infrastructure/di/context'

export type HonoType = { Variables: HonoContextType }

@injectable()
export class ServerService {
  public readonly server: Hono<HonoType>

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
    this.server.use(secureHeaders())
    this.server.use(trimTrailingSlash())
    this.server.use(prettyJSON())
  }

  use(middleware: MiddlewareHandler) {
    this.server.use(middleware)
  }

  on(methods: string[], path: string, handler: Handler) {
    this.server.on(methods, path, handler)
  }

  setupOpenAPI(app: App) {
    const openapiServer = new OpenAPIHono()
    for (const automation of app.automations) {
      const { schema } = automation.trigger
      if (schema.path) {
        const responseAction = automation.actions.find(
          (action) => action.schema.service === 'http' && action.schema.action === 'response'
        )
        const response =
          responseAction && 'body' in responseAction.schema && responseAction.schema.body
            ? this.generateJsonSchema(responseAction.schema.body)
            : undefined
        const route = createRoute({
          method: schema.event === 'get' ? 'get' : 'post',
          path: '/' + join('automation', schema.path),
          description: `Run the automation "${automation.schema.name}" from a ${schema.event.toUpperCase()} request`,
          tags: ['Automations'],
          requestBody:
            schema.event === 'post' && schema.requestBody
              ? {
                  content: {
                    'application/json': {
                      schema: this.convertJsonSchemaToOpenApi(schema.requestBody),
                    },
                  },
                }
              : undefined,
          responses: {
            200: {
              description: 'The automation successfully run',
              content: response
                ? {
                    'application/json': {
                      schema: this.convertJsonSchemaToOpenApi(response),
                    },
                  }
                : {
                    'text/plain': {
                      schema: z.string(),
                    },
                  },
            },
            400: {
              content: {
                'application/json': {
                  schema: z.object({
                    error: z.string(),
                  }),
                },
              },
              description: 'The automation failed to run',
            },
          },
        })
        openapiServer.openapi(route, (c) => {
          return c.json({}, 200)
        })
      }
    }
    openapiServer.doc('/schema', {
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
    openapiServer.get('/scalar', Scalar({ url: '/openapi/schema', theme: 'alternate' }))
    this.server.route('/openapi', openapiServer)
  }

  start() {
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

  private convertJsonSchemaToOpenApi(schema: SchemaObject): SchemaObject {
    if (Array.isArray(schema.type) && schema.type.includes('null')) {
      schema.type = schema.type.find((t: string) => t !== 'null')
      schema.nullable = true
    }

    if (schema.properties) {
      for (const key in schema.properties) {
        schema.properties[key] = this.convertJsonSchemaToOpenApi(schema.properties[key])
      }
    }

    if (schema.items) {
      schema.items = this.convertJsonSchemaToOpenApi(schema.items)
    }

    delete schema.$id
    delete schema.$schema
    delete schema.definitions // move to components.schemas manually if needed
    delete schema.const // unsupported in OpenAPI 3.0

    return schema
  }

  private isNotEmpty(obj: object): obj is Record<string, unknown> {
    return Object.keys(obj).length > 0
  }

  private inferJsonSchema(value: unknown): SchemaObject {
    if (typeof value === 'string') return { type: 'string' }
    if (typeof value === 'number') return { type: 'number' }
    if (typeof value === 'boolean') return { type: 'boolean' }
    if (Array.isArray(value)) {
      return {
        type: 'array',
        items: value.length > 0 ? this.inferJsonSchema(value[0]) : {},
      }
    }
    if (typeof value === 'object' && value !== null && this.isNotEmpty(value)) {
      return this.generateJsonSchema(value)
    }
    return { type: 'null' }
  }

  private generateJsonSchema(obj: Record<string, unknown>): SchemaObject {
    const properties: Record<string, SchemaObject> = {}
    const required: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      properties[key] = this.inferJsonSchema(value)
      required.push(key)
    }
    return {
      type: 'object',
      properties,
      required,
    }
  }
}
