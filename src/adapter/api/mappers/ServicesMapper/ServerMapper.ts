import type { ServerServiceSchema } from '../../schemas/ServiceSchema/ServerSchema'
import type { Drivers } from '../../../spi/drivers'
import { ServerSpi } from '../../../spi/drivers/ServerSpi'
import { Server, type ServerServices } from '../../../../domain/services/Server'

export class ServerMapper {
  static toService(
    drivers: Drivers,
    schema: ServerServiceSchema = {},
    services: ServerServices,
    {
      appName,
      appVersion,
      appDescription,
    }: { appName: string; appVersion: string; appDescription?: string }
  ): Server {
    const server = { ...schema, appName, appVersion, appDescription }
    const driver = drivers.server(server)
    const spi = new ServerSpi(driver)
    return new Server(spi, services, server)
  }
}
