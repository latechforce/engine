import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { DeleteDto, GetDto, PatchDto, PostDto, RequestDto } from '/adapter/spi/dtos/RequestDto'
import type { ServerConfig, ServerMethodOptions } from '/domain/services/Server'
import type { Response } from '/domain/entities/Response'
import { ElysiaDriver } from './ElysiaDriver'

export class ServerDriver implements IServerDriver {
  private _server: ElysiaDriver

  constructor(config: ServerConfig) {
    this._server = new ElysiaDriver(config)
  }

  get = async (
    path: string,
    handler: (getDto: GetDto) => Promise<Response>,
    options: ServerMethodOptions
  ) => {
    await this._server.get(path, handler, options)
  }

  post = async (
    path: string,
    handler: (postDto: PostDto) => Promise<Response>,
    options: ServerMethodOptions
  ) => {
    await this._server.post(path, handler, options)
  }

  patch = async (
    path: string,
    handler: (patchDto: PatchDto) => Promise<Response>,
    options: ServerMethodOptions
  ) => {
    await this._server.patch(path, handler, options)
  }

  delete = async (
    path: string,
    handler: (deleteDto: DeleteDto) => Promise<Response>,
    options: ServerMethodOptions
  ) => {
    await this._server.delete(path, handler, options)
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
