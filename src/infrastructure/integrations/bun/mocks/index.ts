import type { Integrations } from '@adapter/spi/integrations'
import type { NotionConfig } from '@domain/integrations/Notion'
import type { PappersConfig } from '@domain/integrations/Pappers'
import type { QontoConfig } from '@domain/integrations/Qonto'
import type { NgrokConfig } from '@domain/integrations/Ngrok'
import type { AirtableConfig } from '@domain/integrations/Airtable'

import { NotionIntegration } from './notion/NotionIntegration.mock'
import { PappersIntegration } from './pappers/PappersIntegration.mock'
import { QontoIntegration } from './qonto/QontoIntegration.mock'
import { NgrokIntegration } from './ngrok/NgrokIntegration.mock'
import { AirtableIntegration } from './airtable/AirtableIntegration.mock'

export const mocks: Integrations = {
  airtable: (config?: AirtableConfig) => new AirtableIntegration(config),
  notion: (config?: NotionConfig) => new NotionIntegration(config),
  pappers: (config?: PappersConfig) => new PappersIntegration(config),
  qonto: (config?: QontoConfig) => new QontoIntegration(config),
  ngrok: (config?: NgrokConfig) => new NgrokIntegration(config),
}
