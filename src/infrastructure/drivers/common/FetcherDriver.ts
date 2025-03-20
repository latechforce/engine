import type { IFetcherDriver } from '/adapter/spi/drivers/FetcherSpi'

export class FetcherDriver implements IFetcherDriver {
  get = async (url: string, options: RequestInit = {}) => {
    return fetch(url, options)
  }

  post = async (url: string, body: object = {}, options: RequestInit = {}) => {
    const { headers = {}, ...rest } = options
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      ...rest,
    })
  }
}
