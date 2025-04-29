import type { BaseConfig } from '../base'

export interface ZoomConfig extends BaseConfig {
  clientId: string
  clientSecret: string
  accessToken?: string
  authBaseUrl?: string
}
