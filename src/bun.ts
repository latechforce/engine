import { drivers } from '/infrastructure/drivers/bun'
import { integrations } from '/infrastructure/integrations/bun'
import App from '/adapter/api'
import type { Drivers } from '/adapter/spi/drivers'
import type { Integrations } from '/adapter/spi/integrations'

export default class extends App {
  constructor(options?: { drivers?: Partial<Drivers>; integrations?: Partial<Integrations> }) {
    const customDrivers = options?.drivers ?? {}
    const customIntegrations = options?.integrations ?? {}
    super({ ...drivers, ...customDrivers }, { ...integrations, ...customIntegrations })
  }
}
