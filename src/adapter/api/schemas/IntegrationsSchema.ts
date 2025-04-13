import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import type { CalendlyConfig } from '/domain/integrations/Calendly'

/**
 * Integrations configuration interface
 * @title Integrations
 * @description Defines configurations for various third-party service integrations
 */
export interface IntegrationsSchema {
  /**
   * Airtable configurations
   * @description Configurations for Airtable integration
   * @example [{
   *   name: "main-database",
   *   apiKey: "key1234567890ABCD",
   *   databaseId: "app1234567890ABCD"
   * }]
   */
  airtable?: AirtableConfig[]
  /**
   * Notion configurations
   * @description Configurations for Notion integration
   * @example [{
   *   name: "project-management",
   *   token: "secret_1234567890ABCD",
   *   pollingInterval: 300000
   * }]
   */
  notion?: NotionConfig[]
  /**
   * Pappers configurations
   * @description Configurations for Pappers company data integration
   * @example [{
   *   name: "company-data",
   *   apiKey: "1234567890ABCD"
   * }]
   */
  pappers?: PappersConfig[]
  /**
   * Qonto configurations
   * @description Configurations for Qonto banking integration
   * @example [{
   *   name: "business-account",
   *   organisationSlug: "my-company",
   *   secretKey: "1234567890ABCD",
   *   stagingToken: "staging_1234567890ABCD"
   * }]
   */
  qonto?: QontoConfig[]
  /**
   * Google configurations
   * @description Configurations for Google services integration
   */
  google?: {
    /**
     * Gmail configurations
     * @description Configurations for Gmail integration
     * @example [{
     *   name: "support-email",
     *   user: "support@company.com",
     *   password: "app-specific-password"
     * }]
     */
    mail?: GoogleMailConfig[]
  }
  /**
   * GoCardless configurations
   * @description Configurations for GoCardless payment integration
   * @example [{
   *   name: "payment-processing",
   *   accessToken: "live_1234567890ABCD"
   * }]
   */
  gocardless?: GoCardlessConfig[]
  /**
   * Phantombuster configurations
   * @description Configurations for Phantombuster automation integration
   * @example [{
   *   name: "linkedin-automation",
   *   apiKey: "1234567890ABCD"
   * }]
   */
  phantombuster?: PhantombusterConfig[]
  /**
   * Calendly configurations
   * @description Configurations for Calendly scheduling integration
   * @example [{
   *   name: "scheduling",
   *   user: {
   *     accessToken: "1234567890ABCD"
   *   }
   * }]
   */
  calendly?: CalendlyConfig[]
}
