import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { GoogleMailConfig } from '/domain/integrations/Google/GoogleMail'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'

import type { IPappersIntegration } from './PappersSpi'
import type { INotionIntegration } from './NotionSpi'
import type { IQontoIntegration } from './QontoSpi'
import type { INgrokIntegration } from './NgrokSpi'
import type { IAirtableIntegration } from './AirtableSpi'
import type { IGoogleMailIntegration } from './GoogleMailSpi'
import type { IGoCardlessIntegration } from './GoCardlessSpi'
import type { IPhantombusterIntegration } from './PhantombusterSpi'

export interface Integrations {
  airtable: (config?: AirtableConfig) => IAirtableIntegration
  notion: (config?: NotionConfig) => INotionIntegration
  pappers: (config?: PappersConfig) => IPappersIntegration
  qonto: (config?: QontoConfig) => IQontoIntegration
  ngrok: (config?: NgrokConfig) => INgrokIntegration
  googleMail: (config?: GoogleMailConfig) => IGoogleMailIntegration
  gocardless: (config?: GoCardlessConfig) => IGoCardlessIntegration
  phantombuster: (config?: PhantombusterConfig) => IPhantombusterIntegration
}
