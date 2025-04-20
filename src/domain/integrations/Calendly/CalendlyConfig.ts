import type { BaseConfig } from '../base'

export interface CalendlyConfig extends BaseConfig {
  clientId: string
  clientSecret: string
  accessToken?: string
  authBaseUrl?: string
}
