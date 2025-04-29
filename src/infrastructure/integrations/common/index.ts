import type { Integrations } from '/adapter/spi/integrations'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'

import { NotionIntegration } from './notion/NotionIntegration'
import { PappersIntegration } from './pappers/PappersIntegration'
import { QontoIntegration } from './qonto/QontoIntegration'
import { NgrokIntegration } from './ngrok/NgrokIntegration'
import { AirtableIntegration } from './airtable/AirtableIntegration'
import { GoogleMailIntegration } from './google/mail/GoogleMailIntegration'
import { GoCardlessIntegration } from './gocardless/GoCardlessIntegration'
import { PhantombusterIntegration } from './phantombuster/PhantombusterIntegration'
import { CalendlyIntegration } from './calendly/CalendlyIntegration'
import { YouCanBookMeIntegration } from './youcanbookme/YouCanBookMeIntegration'
import { JotformIntegration } from './jotform/JotformIntegration'
import { ZoomIntegration } from './zoom/ZoomIntegration'

export const integrations: Integrations = {
  airtable: (config: AirtableConfig) => new AirtableIntegration(config),
  notion: (config: NotionConfig) => new NotionIntegration(config),
  pappers: (config: PappersConfig) => new PappersIntegration(config),
  qonto: (config: QontoConfig) => new QontoIntegration(config),
  ngrok: (config: NgrokConfig) => new NgrokIntegration(config),
  googleMail: (config: GoogleMailConfig) => new GoogleMailIntegration(config),
  gocardless: (config: GoCardlessConfig) => new GoCardlessIntegration(config),
  phantombuster: (config: PhantombusterConfig) => new PhantombusterIntegration(config),
  calendly: (config: CalendlyConfig) => new CalendlyIntegration(config),
  youCanBookMe: (config: YouCanBookMeConfig) => new YouCanBookMeIntegration(config),
  jotform: (config: JotformConfig) => new JotformIntegration(config),
  zoom: (config: ZoomConfig) => new ZoomIntegration(config),
}
