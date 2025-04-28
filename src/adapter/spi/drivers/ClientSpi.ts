import type { Headers } from '/domain/entities/Request'
import type { ClientHtmlAttributesOptions, IClientSpi } from '/domain/services/Client'

export interface IClientDriver {
  readJsFiles: () => Promise<{ name: string; content: string }[]>
  getHtmlAttributes: (options: ClientHtmlAttributesOptions) => Record<string, string>
  getTargetIdFromHeaders: (headers: Headers) => string | undefined
}

export class ClientSpi implements IClientSpi {
  constructor(private _driver: IClientDriver) {}

  readJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    return this._driver.readJsFiles()
  }

  getHtmlAttributes = (options: ClientHtmlAttributesOptions): Record<string, string> => {
    return this._driver.getHtmlAttributes(options)
  }

  getTargetIdFromHeaders = (options: Headers) => {
    return this._driver.getTargetIdFromHeaders(options)
  }
}
