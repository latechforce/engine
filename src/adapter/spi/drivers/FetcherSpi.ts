import type { IFetcherSpi } from '/domain/services/Fetcher'

export interface IFetcherDriver {
  get: (url: string, options?: RequestInit) => Promise<Response>
  post: (url: string, body?: object, options?: RequestInit) => Promise<Response>
  put: (url: string, body?: object, options?: RequestInit) => Promise<Response>
}

export class FetcherSpi implements IFetcherSpi {
  constructor(private _driver: IFetcherDriver) {}

  get = (url: string, options?: RequestInit) => {
    return this._driver.get(url, options)
  }

  post = (url: string, body?: object, options?: RequestInit) => {
    return this._driver.post(url, body, options)
  }

  put = (url: string, body?: object, options?: RequestInit) => {
    return this._driver.put(url, body, options)
  }
}
