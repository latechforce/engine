import App from '../../../bun'
import type { Drivers } from '../../../adapter/spi/drivers'
import { drivers as allDrivers } from '../../drivers/bun'
import { mocks } from '../../integrations/bun/mocks'

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
