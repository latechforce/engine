export interface IFetcherSpi {
  get: (path: string, options?: RequestInit) => Promise<Response>
  post: (path: string, body?: object, options?: RequestInit) => Promise<Response>
}

export class Fetcher {
  constructor(private _spi: IFetcherSpi) {}

  get = (url: string, options?: RequestInit): Promise<Response> => {
    return this._spi.get(url, options)
  }

  post = (url: string, body?: object, options?: RequestInit): Promise<Response> => {
    return this._spi.post(url, body, options)
  }
}
