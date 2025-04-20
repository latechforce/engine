import type { Drivers } from '/adapter/spi/drivers'
import { TunnelSpi } from '/adapter/spi/drivers/TunnelSpi'
import { Tunnel } from '/domain/services/Tunnel'
import type { TunnelServiceSchema } from '../../schemas/ServiceSchema/TunnelSchema'

export class TunnelMapper {
  static toService(drivers: Drivers, schema?: TunnelServiceSchema): Tunnel {
    const driver = drivers.tunnel(schema)
    const spi = new TunnelSpi(driver)
    return new Tunnel(spi, schema)
  }
}
