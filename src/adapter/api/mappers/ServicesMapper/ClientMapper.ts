import type { Drivers } from '../../../spi/drivers'
import { ClientSpi } from '../../../spi/drivers/ClientSpi'
import { Client, type ClientServices } from '../../../../domain/services/Client'

export class ClientMapper {
  static toService(drivers: Drivers, services: ClientServices): Client {
    const driver = drivers.client()
    const spi = new ClientSpi(driver)
    return new Client(spi, services)
  }
}
