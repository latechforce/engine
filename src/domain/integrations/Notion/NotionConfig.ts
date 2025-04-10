import type { BaseConfig } from '../base'

export interface NotionConfig extends BaseConfig {
  token: string
  pollingInterval?: number
}
