import { drivers } from '/infrastructure/drivers/bun'
import { integrations } from '/infrastructure/integrations/bun'
import App from '/adapter/api'
import type { Drivers } from '/adapter/spi/drivers'
import type { Integrations } from '/adapter/spi/integrations'

export { mocks } from '/infrastructure/integrations/bun/mocks'
export { NotionTablePage } from '/domain/integrations/Notion/NotionTablePage'
export { Record as DatabaseTableRecord } from '/domain/entities/Record'

export default class extends App {
  constructor(options?: { drivers?: Partial<Drivers>; integrations?: Partial<Integrations> }) {
    const customDrivers = options?.drivers ?? {}
    const customIntegrations = options?.integrations ?? {}
    super({ ...drivers, ...customDrivers }, { ...integrations, ...customIntegrations })
  }
}
