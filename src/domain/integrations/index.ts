import type { AirtableConfig } from './Airtable'
import type { CalendlyConfig } from './Calendly'
import type { GoCardlessConfig } from './GoCardless'
import type { GoogleMailConfig } from './Google/Mail'
import type { NotionConfig } from './Notion'
import type { PappersConfig } from './Pappers'
import type { PhantombusterConfig } from './Phantombuster'
import type { QontoConfig } from './Qonto'
import type { YouCanBookMeConfig } from './YouCanBookMe'

export * from './Google/Mail'
export * from './Airtable'
export * from './Notion'
export * from './Pappers'
export * from './Qonto'
export * from './GoCardless'
export * from './Phantombuster'
export * from './Calendly'
export * from './YouCanBookMe'

export interface IntegrationsConfig {
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
  youcanbookme?: YouCanBookMeConfig[]
}
