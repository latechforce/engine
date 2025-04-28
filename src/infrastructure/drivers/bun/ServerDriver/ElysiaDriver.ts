import { Elysia, t, type TSchema } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import net from 'net'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { DeleteDto, GetDto, PatchDto, PostDto, RequestDto } from '/adapter/spi/dtos/RequestDto'
import type { ServerConfig, ServerMethodOptions } from '/domain/services/Server'
import type { Response as EngineResponse } from '/domain/entities/Response'
import { JsonResponse } from '/domain/entities/Response/Json'
import type { SchemaValidatorJson } from '/domain/services/SchemaValidator'
import { isJsxResponse } from '/domain/entities/Response/Jsx'
import { renderToString } from 'react-dom/server'

export type SwaggerSchema = {
  body?: TSchema
  response?: TSchema
  detail?: {
    tags?: ('Automation' | 'Webhook' | 'Table')[]
    security?: {
      apiKey: []
    }[]
  }
}

export class ElysiaDriver implements IServerDriver {
  private _app: Elysia

  constructor(private _config: ServerConfig) {
    this._app = new Elysia()
      .use(cors())
      .use(
        swagger({
          path: '/api/docs',
          documentation: {
            info: {
              title: _config.appName + ' - API Documentation',
              version: _config.appVersion,
              description: _config.appDescription,
            },
            components: {
              securitySchemes: {
                api_key: {
                  type: 'apiKey',
                  name: 'x-api-key',
                  in: 'header',
                },
              },
            },
            tags: [
              { name: 'Automation', description: 'Automations API' },
              { name: 'Webhook', description: 'Webhooks API' },
              { name: 'Table', description: 'Tables API' },
            ],
          },
        })
      )
      .onRequest(({ set }) => {
        set.headers['Content-Security-Policy'] =
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
          "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
          "img-src 'self' data:; " +
          "font-src 'self' https://cdnjs.cloudflare.com; " +
          "connect-src 'self' https://cdn.jsdelivr.net; " +
          "object-src 'none'; " +
          "frame-ancestors 'none';"
        set.headers['X-Content-Type-Options'] = 'nosniff'
        set.headers['X-Frame-Options'] = 'DENY'
        set.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
        set.headers['Referrer-Policy'] = 'no-referrer'
      })
  }

  get = async (
    path: string,
    handler: (getDto: GetDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.get(
      path,
      async ({ request, query, params, headers }) => {
        const authFailed = this._verifyAuth(options, request)
        if (authFailed) return authFailed
        const getDto: GetDto = {
          path,
          query,
          params,
          baseUrl: '',
          headers,
          method: 'GET',
        }
        return this._formatResponse(await handler(getDto))
      },
      this._preprocessDoc(options)
    )
  }

  post = async (
    path: string,
    handler: (postDto: PostDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.post(
      path,
      async ({ request, query, params, body, headers }) => {
        const authFailed = this._verifyAuth(options, request)
        if (authFailed) return authFailed
        const postDto: PostDto = {
          path,
          query,
          params,
          body,
          baseUrl: '',
          headers,
          method: 'POST',
        }
        return this._formatResponse(await handler(postDto))
      },
      this._preprocessDoc(options)
    )
  }

  patch = async (
    path: string,
    handler: (patchDto: PatchDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.patch(
      path,
      async ({ request, query, params, body, headers }) => {
        const authFailed = this._verifyAuth(options, request)
        if (authFailed) return authFailed
        const patchDto: PatchDto = {
          path,
          query,
          params,
          body,
          baseUrl: '',
          headers,
          method: 'PATCH',
        }
        return this._formatResponse(await handler(patchDto))
      },
      this._preprocessDoc(options)
    )
  }

  delete = async (
    path: string,
    handler: (deleteDto: DeleteDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.delete(
      path,
      async ({ request, query, params, headers }) => {
        const authFailed = this._verifyAuth(options, request)
        if (authFailed) return authFailed
        const deleteDto: DeleteDto = {
          path,
          query,
          params,
          baseUrl: '',
          headers,
          method: 'DELETE',
        }
        return this._formatResponse(await handler(deleteDto))
      },
      this._preprocessDoc(options)
    )
  }

  notFound = async (
    handler: (requestDto: RequestDto) => Promise<EngineResponse>
  ): Promise<void> => {
    this._app.onError(async ({ path, query, params, headers }) => {
      const requestDto: RequestDto = {
        path,
        query,
        params,
        baseUrl: '',
        headers,
        method: 'GET',
      }
      return this._formatResponse(await handler(requestDto))
    })
  }

  findAvailablePort = (minPort: number = 1024, maxPort: number = 65535): Promise<number> => {
    return new Promise((resolve) => {
      const port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort
      const server = net.createServer()
      server.on('error', () => {
        resolve(this.findAvailablePort(minPort, maxPort))
      })
      server.listen(port, () => {
        server.close(() => resolve(port))
      })
    })
  }

  start = async (port: number): Promise<number> => {
    let { idleTimeout } = this._config
    idleTimeout = idleTimeout ? Number(idleTimeout) : 255
    this._app.listen({ port, idleTimeout })
    return port
  }

  stop = async (): Promise<void> => {
    await this._app.stop()
  }

  private _verifyAuth = (options: ServerMethodOptions = {}, request: Request) => {
    const { auth } = options
    if (auth) {
      if (auth === 'ApiKey') {
        const apiKey =
          request.headers.get('x-api-key') ||
          request.headers.get('X-Api-Key') ||
          request.headers.get('X-API-KEY')
        if (!apiKey || !this._config.apiKeys?.includes(apiKey)) {
          return this._formatResponse(
            new JsonResponse({ error: 'Unauthorized: Invalid API Key' }, 401)
          )
        }
      }
    }
  }

  private _preprocessDoc = (options: ServerMethodOptions): Partial<SwaggerSchema> => {
    const { auth, body, response, detail = {} } = options
    const doc: Partial<SwaggerSchema> = { detail }
    if (auth) {
      if (auth === 'ApiKey' && doc.detail) {
        doc.detail.security = [{ apiKey: [] }]
      }
    }
    if (body) {
      doc.body = this._convertJSONSchemaToTSchema(body)
    }
    if (response) {
      doc.response = this._convertJSONSchemaToTSchema(response)
    }
    return doc
  }

  private _convertJSONSchemaToTSchema(schema: SchemaValidatorJson): TSchema {
    if (!schema.type) {
      throw new Error('Invalid schema: type is required')
    }
    switch (schema.type) {
      case 'string':
        return schema.enum
          ? t.Enum(schema.enum.reduce((acc, val) => ({ ...acc, [val]: val }), {}))
          : t.String()
      case 'number':
        return t.Number()
      case 'boolean':
        return t.Boolean()
      case 'array':
        return schema.items
          ? t.Array(this._convertJSONSchemaToTSchema(schema.items))
          : t.Array(t.Any())
      case 'object': {
        const properties = schema.properties
          ? Object.entries(schema.properties).reduce(
              (acc, [key, propSchema]) => {
                acc[key] = this._convertJSONSchemaToTSchema(propSchema)
                return acc
              },
              {} as Record<string, TSchema>
            )
          : {}

        return t.Object(properties, { required: schema.required || [] })
      }
      default:
        throw new Error(`Unsupported schema type: ${schema.type}`)
    }
  }

  private _formatResponse = (response: EngineResponse) => {
    if (isJsxResponse(response)) {
      const html = renderToString(response.jsx)
      return new Response(html, {
        status: response.status,
        headers: response.headers,
      })
    }
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  }
}
