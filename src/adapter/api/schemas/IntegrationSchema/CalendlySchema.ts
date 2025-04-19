import type { CalendlyConfig } from '/domain/integrations/Calendly'

/**
 * Calendly configuration schema
 * @title Calendly
 * @description A configuration schema for Calendly scheduling integration
 */
export interface CalendlyIntegrationSchema {
  /**
   * The account identifier for Calendly
   * @title Account
   * @description The account identifier for Calendly
   */
  account: CalendlyConfig['account']
  /**
   * The base URL for Calendly API
   * @title Base URL
   * @description The base URL for Calendly API
   */
  baseUrl?: CalendlyConfig['baseUrl']
  /**
   * The user configuration for Calendly
   * @title User
   * @description The user configuration for Calendly
   */
  user: {
    /**
     * The access token for Calendly API authentication
     * @title Access Token
     * @description The access token for Calendly API authentication
     */
    accessToken: string
  }
}
