import App from '../../../bun'
import type { Drivers } from '/adapter/spi/drivers'
import { drivers as allDrivers } from '/infrastructure/drivers/bun'
import { mocks } from '/infrastructure/integrations/bun/mocks'

type Options = {
  drivers?: Partial<Drivers>
}

export class MockedApp extends App {
  constructor({ drivers = {} }: Options = {}) {
    super({
      integrations: mocks,
      drivers: {
        ...allDrivers,
        ...drivers,
      },
    })
  }
}
