import type { IFetcherSpi } from '/domain/services/Fetcher'

export interface IFetcherDriver {
  get: (url: string) => Promise<Response>
  post: (url: string, body?: object) => Promise<Response>
}

export class FetcherSpi implements IFetcherSpi {
  constructor(private _driver: IFetcherDriver) {}

  get = (url: string) => {
    return this._driver.get(url)
  }

  post = (url: string, body?: object) => {
    return this._driver.post(url, body)
  }
}
