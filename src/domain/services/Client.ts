import { JsResponse } from '../entities/Response/Js'
import type { Server } from './Server'
import type { Logger } from './Logger'

export interface ClientServices {
  server: Server
  logger: Logger
}

export interface ClientHtmlAttributesOptions {
  post?: string
  get?: string
  target?: string
  action?: 'replace' | 'append' | 'prepend'
  trigger?: 'revealed'
  fileUpload?: boolean
  pushUrl?: string
}

export interface IClientSpi {
  readJsFiles: () => Promise<{ name: string; content: string }[]>
  getHtmlAttributes: (options: ClientHtmlAttributesOptions) => Record<string, string>
}

export class Client {
  jsFiles: string[] = []

  constructor(
    private _spi: IClientSpi,
    private _services: ClientServices
  ) {}

  init = async () => {
    const { server, logger } = this._services
    const jsFiles = await this._spi.readJsFiles()
    for (const jsFile of jsFiles) {
      const path = `/${jsFile.name}`
      this.jsFiles.push(path)
      await server.get(path, async () => new JsResponse(jsFile.content))
    }
    logger.info(`initialized client`)
  }

  getHtmlAttributes = (options: ClientHtmlAttributesOptions) => {
    return this._spi.getHtmlAttributes(options)
  }
}
