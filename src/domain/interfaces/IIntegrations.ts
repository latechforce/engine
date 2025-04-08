import type { GoogleMailConfig } from '../integrations/Google/GoogleMail'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import type { CalendlyConfig } from '../integrations/Calendly/CalendlyConfig'

export interface IIntegrations {
  airtable?: AirtableConfig
  notion?: NotionConfig
  pappers?: PappersConfig
  qonto?: QontoConfig
  google?: {
    mail?: GoogleMailConfig
  }
  gocardless?: GoCardlessConfig
  phantombuster?: PhantombusterConfig
  calendly?: CalendlyConfig
}
