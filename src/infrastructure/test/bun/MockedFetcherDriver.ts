import type { IFetcherDriver } from '/adapter/spi/drivers/FetcherSpi'

export class MockedFetcherDriver implements IFetcherDriver {
  private _endpoints: {
    [key: string]: { [key: string]: (request: Request) => Promise<Response> }
  } = {
    GET: {},
    POST: {},
  }

  get = async (url: string, options: RequestInit = {}) => {
    const matchingUrl = Object.keys(this._endpoints.GET).find((endpoint) =>
      url.startsWith(endpoint)
    )
    if (matchingUrl) {
      return this._endpoints.GET[matchingUrl](new Request(url, { method: 'GET', ...options }))
    }
    throw new Error(`No matching endpoint found for URL: ${url}`)
  }

  post = async (url: string, body: object = {}, options: RequestInit = {}) => {
    const matchingUrl = Object.keys(this._endpoints.POST).find((endpoint) =>
      url.startsWith(endpoint)
    )
    if (matchingUrl) {
      const { headers = {}, ...rest } = options
      return this._endpoints.POST[matchingUrl](
        new Request(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json', ...headers },
          ...rest,
        })
      )
    }
    throw new Error(`No matching endpoint found for URL: ${url}`)
  }

  mock = async (
    method: 'GET' | 'POST',
    url: string,
    endpoint: (request: Request) => Promise<Response>
  ) => {
    this._endpoints[method][url] = endpoint
  }
}
