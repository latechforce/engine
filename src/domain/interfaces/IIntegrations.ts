import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import type { CalendlyConfig } from '/domain/integrations/Calendly'

export interface IIntegrations {
  airtable?: AirtableConfig[]
  notion?: NotionConfig[]
  pappers?: PappersConfig[]
  qonto?: QontoConfig[]
  google?: {
    mail?: GoogleMailConfig[]
  }
  gocardless?: GoCardlessConfig[]
  phantombuster?: PhantombusterConfig[]
  calendly?: CalendlyConfig[]
}
