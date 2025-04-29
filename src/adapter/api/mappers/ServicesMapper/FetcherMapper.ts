import type { Drivers } from '../../../spi/drivers'
import { FetcherSpi } from '../../../spi/drivers/FetcherSpi'
import { Fetcher } from '../../../../domain/services/Fetcher'

export class FetcherMapper {
  static toService(drivers: Drivers): Fetcher {
    const driver = drivers.fetcher()
    const spi = new FetcherSpi(driver)
    return new Fetcher(spi)
  }
}
