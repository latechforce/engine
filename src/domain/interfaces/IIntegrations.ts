import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'

export interface IIntegrations {
  airtable?: AirtableConfig
  notion?: NotionConfig
  pappers?: PappersConfig
  qonto?: QontoConfig
}
