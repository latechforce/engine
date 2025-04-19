import type { GoCardlessConfig } from '/domain/integrations/GoCardless'

/**
 * GoCardless configuration schema
 * @title GoCardless
 * @description A configuration schema for GoCardless payment integration
 */
export interface GoCardlessIntegrationSchema {
  /**
   * The account identifier for the GoCardless integration
   * @title Account
   * @description The account identifier for the GoCardless integration
   */
  account: GoCardlessConfig['account']
  /**
   * The base URL for the GoCardless API
   * @title Base URL
   * @description The base URL for the GoCardless API
   */
  baseUrl?: GoCardlessConfig['baseUrl']
  /**
   * The access token for authenticating with GoCardless
   * @title Access Token
   * @description The access token for authenticating with GoCardless
   */
  accessToken: GoCardlessConfig['accessToken']
}
