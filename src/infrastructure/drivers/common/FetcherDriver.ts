import type { IFetcherDriver } from '/adapter/spi/drivers/FetcherSpi'

export class FetcherDriver implements IFetcherDriver {
  get = async (url: string) => {
    return fetch(url)
  }

  post = async (url: string, body: object = {}) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }
}
