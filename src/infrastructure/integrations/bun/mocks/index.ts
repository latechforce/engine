import type { Integrations } from '/adapter/spi/integrations'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { GoogleMailConfig } from '/domain/integrations/Google/GoogleMail'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'

import { NotionIntegration } from './notion/NotionIntegration.mock'
import { PappersIntegration } from './pappers/PappersIntegration.mock'
import { QontoIntegration } from './qonto/QontoIntegration.mock'
import { NgrokIntegration } from './ngrok/NgrokIntegration.mock'
import { AirtableIntegration } from './airtable/AirtableIntegration.mock'
import { GoogleMailIntegration } from './google/mail/GoogleMailIntegration.mock'
import { GoCardlessIntegration } from './gocardless/GoCardlessIntegration.mock'
import { PhantombusterIntegration } from './phantombuster/PhantombusterIntegration.mock'

export const mocks: Integrations = {
  airtable: (config?: AirtableConfig) => new AirtableIntegration(config),
  notion: (config?: NotionConfig) => new NotionIntegration(config),
  pappers: (config?: PappersConfig) => new PappersIntegration(config),
  qonto: (config?: QontoConfig) => new QontoIntegration(config),
  ngrok: (config?: NgrokConfig) => new NgrokIntegration(config),
  googleMail: (config?: GoogleMailConfig) => new GoogleMailIntegration(config),
  gocardless: (config?: GoCardlessConfig) => new GoCardlessIntegration(config),
  phantombuster: (config?: PhantombusterConfig) => new PhantombusterIntegration(config),
}
