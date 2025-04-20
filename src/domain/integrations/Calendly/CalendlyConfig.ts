import type { BaseConfig } from '../base'

export interface CalendlyConfig extends BaseConfig {
  accessToken: string
  clientId: string
  clientSecret: string
  authBaseUrl?: string
}
