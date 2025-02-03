import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import net from 'net'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { DeleteDto, GetDto, PatchDto, PostDto, RequestDto } from '/adapter/spi/dtos/RequestDto'
import type { ServerConfig, ServerMethodOptions } from '/domain/services/Server'
import type { Response as EngineResponse } from '/domain/entities/Response'
import { JsonResponse } from '/domain/entities/Response/Json'

export class ElysiaDriver implements IServerDriver {
  private _app: Elysia

  constructor(private _config: ServerConfig) {
    this._app = new Elysia()
      .use(cors())
      .use(
        swagger({
          path: '/api/swagger',
          documentation: {
            info: {
              title: _config.appName + ' - Swagger Documentation',
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
    this._app.get(path, async ({ request, query, params }) => {
      const authFailed = this._verifyAuth(options, request)
      if (authFailed) return authFailed
      const getDto: GetDto = { path, query, params, baseUrl: '', headers: {}, method: 'GET' }
      return this._formatResponse(await handler(getDto))
    })
  }

  post = async (
    path: string,
    handler: (postDto: PostDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.post(path, async ({ request, query, params, body }) => {
      const authFailed = this._verifyAuth(options, request)
      if (authFailed) return authFailed
      const postDto: PostDto = {
        path,
        query,
        params,
        body,
        baseUrl: '',
        headers: {},
        method: 'POST',
      }
      return this._formatResponse(await handler(postDto))
    })
  }

  patch = async (
    path: string,
    handler: (patchDto: PatchDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.patch(path, async ({ request, query, params, body }) => {
      const authFailed = this._verifyAuth(options, request)
      if (authFailed) return authFailed
      const patchDto: PatchDto = {
        path,
        query,
        params,
        body,
        baseUrl: '',
        headers: {},
        method: 'PATCH',
      }
      return this._formatResponse(await handler(patchDto))
    })
  }

  delete = async (
    path: string,
    handler: (deleteDto: DeleteDto) => Promise<EngineResponse>,
    options: ServerMethodOptions
  ): Promise<void> => {
    this._app.delete(path, async ({ request, query, params }) => {
      const authFailed = this._verifyAuth(options, request)
      if (authFailed) return authFailed
      const deleteDto: DeleteDto = {
        path,
        query,
        params,
        baseUrl: '',
        headers: {},
        method: 'DELETE',
      }
      return this._formatResponse(await handler(deleteDto))
    })
  }

  notFound = async (
    handler: (requestDto: RequestDto) => Promise<EngineResponse>
  ): Promise<void> => {
    this._app.onError(async ({ path, query, params }) => {
      const requestDto: RequestDto = {
        path,
        query,
        params,
        baseUrl: '',
        headers: {},
        method: 'GET',
      }
      return this._formatResponse(await handler(requestDto))
    })
  }

  start = async (): Promise<number> => {
    const port = this._config.port
      ? Number(this._config.port)
      : await this._findRandomAvailablePort()
    this._app.listen(port)
    return port
  }

  stop = async (): Promise<void> => {
    await this._app.stop()
  }

  private _verifyAuth = (options: ServerMethodOptions = {}, request: Request) => {
    const { auth } = options
    if (auth) {
      if (auth === 'ApiKey') {
        const apiKey = request.headers.get('x-api-key')
        if (!apiKey || !this._config.apiKeys?.includes(apiKey)) {
          return this._formatResponse(
            new JsonResponse({ error: 'Unauthorized: Invalid API Key' }, 401)
          )
        }
      }
    }
  }

  private _findRandomAvailablePort(
    minPort: number = 1024,
    maxPort: number = 65535
  ): Promise<number> {
    return new Promise((resolve) => {
      const port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort
      const server = net.createServer()
      server.on('error', () => {
        resolve(this._findRandomAvailablePort(minPort, maxPort))
      })
      server.listen(port, () => {
        server.close(() => resolve(port))
      })
    })
  }

  private _formatResponse = (response: EngineResponse) => {
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  }
}
