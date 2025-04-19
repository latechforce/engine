import type { JotformConfig } from '/domain/integrations/Jotform'

/**
 * Jotform configuration schema
 * @title Jotform
 * @description A configuration schema for Jotform integration
 */
export interface JotformIntegrationSchema {
  /**
   * The account name for the Jotform integration
   * @title Account
   * @description The account name for the Jotform integration
   */
  account: JotformConfig['account']
  /**
   * The base URL for the Jotform API
   * @title Base URL
   * @description The base URL for the Jotform API
   */
  baseUrl?: JotformConfig['baseUrl']
  /**
   * The API key for authenticating with Jotform
   * @title API Key
   * @description The API key for authenticating with Jotform
   */
  apiKey: JotformConfig['apiKey']
}
