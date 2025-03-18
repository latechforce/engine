import { JsResponse } from '../entities/Response/Js'
import type { Server } from './Server'

export interface ClientServices {
  server: Server
}

export interface ClientHtmlAttributesOptions {
  post?: string
  target?: string
  action?: 'replace' | 'append' | 'prepend'
  fileUpload?: boolean
}

export interface IClientSpi {
  getJs: () => Promise<string>
  getHtmlAttributes: (options: ClientHtmlAttributesOptions) => Record<string, string>
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

  getHtmlAttributes = (options: ClientHtmlAttributesOptions) => {
    return this._spi.getHtmlAttributes(options)
  }
}
