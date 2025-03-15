import { JsResponse } from '../entities/Response/Js'
import type { Server } from './Server'

export interface ClientServices {
  server: Server
}

export interface IClientSpi {
  getJs: () => Promise<string>
}

export class Client {
  constructor(
    private _spi: IClientSpi,
    private _services: ClientServices
  ) {}

  init = async () => {
    const { server } = this._services
    const js = await this._spi.getJs()
    await server.get('/script.js', async () => new JsResponse(js))
  }
}
