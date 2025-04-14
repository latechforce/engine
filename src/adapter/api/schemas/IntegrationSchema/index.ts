import type { AirtableIntegrationSchema } from './AirtableSchema'
import type { NotionIntegrationSchema } from './NotionSchema'
import type { PappersIntegrationSchema } from './PappersSchema'
import type { QontoIntegrationSchema } from './QontoSchema'
import type { GoCardlessIntegrationSchema } from './GoCardlessSchema'
import type { PhantombusterIntegrationSchema } from './PhantombusterSchema'
import type { CalendlyIntegrationSchema } from './CalendlySchema'
import type { GoogleIntegrationSchema } from './Google'
import type { YouCanBookMeIntegrationSchema } from './YouCanBookMeSchema'

/**
 * Integrations configuration interface
 * @title Integrations
 * @description Defines configurations for various third-party service integrations
 */
export interface IntegrationSchema {
  airtable?: AirtableIntegrationSchema[]
  notion?: NotionIntegrationSchema[]
  pappers?: PappersIntegrationSchema[]
  qonto?: QontoIntegrationSchema[]
  google?: GoogleIntegrationSchema
  gocardless?: GoCardlessIntegrationSchema[]
  phantombuster?: PhantombusterIntegrationSchema[]
  calendly?: CalendlyIntegrationSchema[]
  youcanbookme?: YouCanBookMeIntegrationSchema[]
}
