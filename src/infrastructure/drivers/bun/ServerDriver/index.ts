import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { DeleteDto, GetDto, PatchDto, PostDto, RequestDto } from '/adapter/spi/dtos/RequestDto'
import type { ServerConfig } from '/domain/services/Server'
import type { Response } from '/domain/entities/Response'
import { ElysiaDriver } from './ElysiaDriver'

export class ServerDriver implements IServerDriver {
  private _server: ElysiaDriver

  constructor(config: ServerConfig) {
    this._server = new ElysiaDriver(config)
  }

  get = async (path: string, handler: (getDto: GetDto) => Promise<Response>) => {
    await this._server.get(path, handler)
  }

  post = async (path: string, handler: (postDto: PostDto) => Promise<Response>) => {
    await this._server.post(path, handler)
  }

  patch = async (path: string, handler: (patchDto: PatchDto) => Promise<Response>) => {
    await this._server.patch(path, handler)
  }

  delete = async (path: string, handler: (deleteDto: DeleteDto) => Promise<Response>) => {
    await this._server.delete(path, handler)
  }

  notFound = async (handler: (requestDto: RequestDto) => Promise<Response>) => {
    await this._server.notFound(handler)
  }

  start = async (): Promise<number> => {
    return this._server.start()
  }

  stop = async () => {
    await this._server.stop()
  }
}
