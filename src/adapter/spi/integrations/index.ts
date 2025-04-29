import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import type { CalendlyConfig } from '/domain/integrations/Calendly'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'

import type { IPappersIntegration } from './PappersSpi'
import type { INotionIntegration } from './NotionSpi'
import type { IQontoIntegration } from './QontoSpi'
import type { INgrokIntegration } from './NgrokSpi'
import type { IAirtableIntegration } from './AirtableSpi'
import type { IGoogleMailIntegration } from './GoogleMailSpi'
import type { IGoCardlessIntegration } from './GoCardlessSpi'
import type { IPhantombusterIntegration } from './PhantombusterSpi'
import type { ICalendlyIntegration } from './CalendlySpi'
import type { IYouCanBookMeIntegration } from './YouCanBookMeSpi'
import type { IJotformIntegration } from './JotformSpi'
import type { IZoomIntegration } from './ZoomSpi'

export interface Integrations {
  airtable: (config: AirtableConfig) => IAirtableIntegration
  notion: (config: NotionConfig) => INotionIntegration
  pappers: (config: PappersConfig) => IPappersIntegration
  qonto: (config: QontoConfig) => IQontoIntegration
  ngrok: (config: NgrokConfig) => INgrokIntegration
  googleMail: (config: GoogleMailConfig) => IGoogleMailIntegration
  gocardless: (config: GoCardlessConfig) => IGoCardlessIntegration
  phantombuster: (config: PhantombusterConfig) => IPhantombusterIntegration
  calendly: (config: CalendlyConfig) => ICalendlyIntegration
  youCanBookMe: (config: YouCanBookMeConfig) => IYouCanBookMeIntegration
  jotform: (config: JotformConfig) => IJotformIntegration
  zoom: (config: ZoomConfig) => IZoomIntegration
}
