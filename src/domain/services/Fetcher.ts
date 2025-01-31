export interface IFetcherSpi {
  get: (path: string) => Promise<Response>
  post: (path: string, body: object) => Promise<Response>
}

export class Fetcher {
  constructor(private _spi: IFetcherSpi) {}

  get = (url: string): Promise<Response> => {
    return this._spi.get(url)
  }

  post = (url: string, body: object): Promise<Response> => {
    return this._spi.post(url, body)
  }
}
