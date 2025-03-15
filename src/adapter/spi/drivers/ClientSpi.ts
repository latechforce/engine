import type { ClientHtmlAttributesOptions, IClientSpi } from '/domain/services/Client'

export interface IClientDriver {
  getJs: () => Promise<string>
  getHtmlAttributes: (options: ClientHtmlAttributesOptions) => Record<string, string>
}

export class ClientSpi implements IClientSpi {
  constructor(private _driver: IClientDriver) {}

  getJs = async (): Promise<string> => {
    return this._driver.getJs()
  }

  getHtmlAttributes = (options: ClientHtmlAttributesOptions): Record<string, string> => {
    return this._driver.getHtmlAttributes(options)
  }
}
