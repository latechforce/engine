export * from './Google/Mail'
export * from './Airtable'
export * from './Notion'
export * from './Pappers'
export * from './Qonto'
export * from './GoCardless'
export * from './Phantombuster'
export * from './Calendly'
export * from './YouCanBookMe'

import type { Airtable, AirtableConfig } from './Airtable'
import type { Calendly, CalendlyConfig } from './Calendly'
import type { GoCardless, GoCardlessConfig } from './GoCardless'
import type { GoogleMail, GoogleMailConfig } from './Google/Mail'
import type { Jotform } from './Jotform'
import type { Notion, NotionConfig } from './Notion'
import type { Pappers, PappersConfig } from './Pappers'
import type { Phantombuster, PhantombusterConfig } from './Phantombuster'
import type { Qonto, QontoConfig } from './Qonto'
import type { YouCanBookMe, YouCanBookMeConfig } from './YouCanBookMe'
import type { Zoom, ZoomConfig } from './Zoom'

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
  zoom?: ZoomConfig[]
}

export interface Integrations {
  notion: Notion
  calendly: Calendly
  airtable: Airtable
  pappers: Pappers
  qonto: Qonto
  jotform: Jotform
  youcanbookme: YouCanBookMe
  phantombuster: Phantombuster
  googleMail: GoogleMail
  gocardless: GoCardless
  zoom: Zoom
}

export type Integration =
  | Notion
  | Calendly
  | Airtable
  | Pappers
  | Qonto
  | Jotform
  | YouCanBookMe
  | Phantombuster
  | GoogleMail
  | GoCardless
  | Zoom
