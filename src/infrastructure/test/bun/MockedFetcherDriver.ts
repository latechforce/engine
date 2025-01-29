import type { IFetcherDriver } from '/adapter/spi/drivers/FetcherSpi'

export class MockedFetcherDriver implements IFetcherDriver {
  private _endpoints: { [key: string]: { [key: string]: (request: Request) => Response } } = {
    GET: {},
  }

  get = async (url: string) => {
    const matchingUrl = Object.keys(this._endpoints.GET).find((endpoint) =>
      endpoint.startsWith(url)
    )
    if (matchingUrl) {
      return this._endpoints.GET[matchingUrl](new Request(url, { method: 'GET' }))
    }
    throw new Error(`No matching endpoint found for URL: ${url}`)
  }

  addEndpoint = async (method: 'GET', url: string, endpoint: (request: Request) => Response) => {
    this._endpoints[method][url] = endpoint
  }
}
