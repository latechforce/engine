import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { DeleteDto, GetDto, PatchDto, PostDto, RequestDto } from '/adapter/spi/dtos/RequestDto'
import type { ServerConfig } from '/domain/services/Server'
import type { Response } from '/domain/entities/Response'
import net from 'net'

export class ElysiaDriver implements IServerDriver {
  private _app: Elysia

  constructor(private _config: ServerConfig) {
    this._app = new Elysia()
    this._app.onRequest(({ set }) => {
      set.headers['Content-Security-Policy'] = "default-src 'self'"
      set.headers['X-Content-Type-Options'] = 'nosniff'
      set.headers['X-Frame-Options'] = 'DENY'
    })
    this._app.use(cors())
  }

  get = async (path: string, handler: (getDto: GetDto) => Promise<Response>): Promise<void> => {
    this._app.get(path, async ({ query, params }) => {
      const getDto: GetDto = { path, query, params, baseUrl: '', headers: {}, method: 'GET' }
      return this._formatResponse(await handler(getDto))
    })
  }

  post = async (path: string, handler: (postDto: PostDto) => Promise<Response>): Promise<void> => {
    this._app.post(path, async ({ query, params, body }) => {
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
    handler: (patchDto: PatchDto) => Promise<Response>
  ): Promise<void> => {
    this._app.patch(path, async ({ query, params, body }) => {
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
    handler: (deleteDto: DeleteDto) => Promise<Response>
  ): Promise<void> => {
    this._app.delete(path, async ({ query, params }) => {
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

  notFound = async (handler: (requestDto: RequestDto) => Promise<Response>): Promise<void> => {
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

  private _formatResponse = (response: Response) => {
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  }
}
