import type { BaseConfig } from '../base'

export interface CalendlyConfig extends BaseConfig {
  user: {
    accessToken: string
  }
}
