import App from '../../../bun'
import { MockedFetcherDriver } from './MockedFetcherDriver'
import { drivers } from '/infrastructure/drivers/bun'
import { mocks } from '/infrastructure/integrations/bun/mocks'

export const mockedFetcher = new MockedFetcherDriver()

export class MockedApp extends App {
  constructor() {
    super({
      integrations: mocks,
      drivers: {
        ...drivers,
        fetcher: () => mockedFetcher,
      },
    })
  }
}
