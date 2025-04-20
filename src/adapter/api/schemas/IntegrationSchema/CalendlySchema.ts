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
   * The access token for Calendly API authentication
   * @title Access Token
   * @description The access token for Calendly API authentication
   */
  accessToken: string
  /**
   * The client ID for Calendly API authentication
   * @title Client ID
   * @description The client ID for Calendly API authentication
   */
  clientId: string
  /**
   * The client secret for Calendly API authentication
   * @title Client Secret
   * @description The client secret for Calendly API authentication
   */
  clientSecret: string
  /**
   * The base URL for Calendly API authentication
   * @title Base URL
   * @description The base URL for Calendly API authentication
   */
  authBaseUrl?: CalendlyConfig['authBaseUrl']
}
