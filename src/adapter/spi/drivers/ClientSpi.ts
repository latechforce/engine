import type { IClientSpi } from '/domain/services/Client'

export interface IClientDriver {
  getJs: () => Promise<string>
}

export class ClientSpi implements IClientSpi {
  constructor(private _driver: IClientDriver) {}

  getJs = async (): Promise<string> => {
    return this._driver.getJs()
  }
}
