import { drivers } from '/infrastructure/drivers/bun'
import { integrations } from '/infrastructure/integrations/bun'
import { components } from '/infrastructure/components/tailwindcss'
import App from '/adapter/api'
import type { Drivers } from '/adapter/spi/drivers'
import type { Integrations } from '/adapter/spi/integrations'
import type { Components } from './domain/components'

export default class extends App {
  constructor(options?: {
    drivers?: Partial<Drivers>
    integrations?: Partial<Integrations>
    components?: Partial<Components>
    env?: Record<string, string | undefined>
  }) {
    const customDrivers = options?.drivers ?? {}
    const customIntegrations = options?.integrations ?? {}
    const customComponents = options?.components ?? {}
    const customEnv = options?.env ?? {}
    super(
      { ...drivers, ...customDrivers },
      { ...integrations, ...customIntegrations },
      { ...components, ...customComponents },
      { ...process.env, ...customEnv }
    )
  }
}
