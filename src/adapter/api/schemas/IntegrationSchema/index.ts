import type { AirtableIntegrationSchema } from './AirtableSchema'
import type { NotionIntegrationSchema } from './NotionSchema'
import type { PappersIntegrationSchema } from './PappersSchema'
import type { QontoIntegrationSchema } from './QontoSchema'
import type { GoCardlessIntegrationSchema } from './GoCardlessSchema'
import type { PhantombusterIntegrationSchema } from './PhantombusterSchema'
import type { CalendlyIntegrationSchema } from './CalendlySchema'
import type { GoogleIntegrationSchema } from './Google'
import type { YouCanBookMeIntegrationSchema } from './YouCanBookMeSchema'
import type { JotformIntegrationSchema } from './JotformSchema'
import type { ZoomIntegrationSchema } from './ZoomSchema'

/**
 * Integrations configuration interface
 * @title Integrations
 * @description Defines configurations for various third-party service integrations
 */
export interface IntegrationSchema {
  /**
   * Airtable integrations
   * @title Airtable
   * @description Configuration for Airtable integrations.
   */
  airtable?: AirtableIntegrationSchema[]
  /**
   * Notion integrations
   * @title Notion
   * @description Configuration for Notion integrations.
   */
  notion?: NotionIntegrationSchema[]
  /**
   * Pappers integrations
   * @title Pappers
   * @description Configuration for Pappers integrations.
   */
  pappers?: PappersIntegrationSchema[]
  /**
   * Qonto integrations
   * @title Qonto
   * @description Configuration for Qonto integrations.
   */
  qonto?: QontoIntegrationSchema[]
  /**
   * Google integrations
   * @title Google
   * @description Configuration for Google integrations.
   */
  google?: GoogleIntegrationSchema
  /**
   * GoCardless integrations
   * @title GoCardless
   * @description Configuration for GoCardless integrations.
   */
  gocardless?: GoCardlessIntegrationSchema[]
  /**
   * Phantombuster integrations
   * @title Phantombuster
   * @description Configuration for Phantombuster integrations.
   */
  phantombuster?: PhantombusterIntegrationSchema[]
  /**
   * Calendly integrations
   * @title Calendly
   * @description Configuration for Calendly integrations.
   */
  calendly?: CalendlyIntegrationSchema[]
  /**
   * YouCanBookMe integrations
   * @title YouCanBookMe
   * @description Configuration for YouCanBookMe integrations.
   */
  youcanbookme?: YouCanBookMeIntegrationSchema[]
  /**
   * Jotform integrations
   * @title Jotform
   * @description Configuration for Jotform integrations.
   */
  jotform?: JotformIntegrationSchema[]
  /**
   * Zoom integrations
   * @title Zoom
   * @description Configuration for Zoom integrations.
   */
  zoom?: ZoomIntegrationSchema[]
}
