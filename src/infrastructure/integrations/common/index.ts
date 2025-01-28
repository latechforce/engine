import type { Integrations } from '/adapter/spi/integrations'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'

import { NotionIntegration } from './notion/NotionIntegration'
import { PappersIntegration } from './pappers/PappersIntegration'
import { QontoIntegration } from './qonto/QontoIntegration'
import { NgrokIntegration } from './ngrok/NgrokIntegration'
import { AirtableIntegration } from './airtable/AirtableIntegration'

export const integrations: Integrations = {
  airtable: (config?: AirtableConfig) => new AirtableIntegration(config),
  notion: (config?: NotionConfig) => new NotionIntegration(config),
  pappers: (config?: PappersConfig) => new PappersIntegration(config),
  qonto: (config?: QontoConfig) => new QontoIntegration(config),
  ngrok: (config?: NgrokConfig) => new NgrokIntegration(config),
}
