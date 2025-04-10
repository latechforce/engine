import type { BaseConfig } from '../base'

export interface AirtableConfig extends BaseConfig {
  apiKey: string
  databaseId: string
}
