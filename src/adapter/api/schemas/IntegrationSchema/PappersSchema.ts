import type { PappersConfig } from '/domain/integrations/Pappers'

/**
 * Pappers configuration schema
 * @title Pappers
 * @description A configuration schema for Pappers integration
 */
export interface PappersIntegrationSchema {
  /**
   * The account identifier for the Pappers integration
   * @title Account
   * @description The account identifier for the Pappers integration
   */
  account: PappersConfig['account']
  /**
   * The API key for authenticating with Pappers
   * @title API Key
   * @description The API key for authenticating with Pappers
   */
  apiKey: PappersConfig['apiKey']
  /**
   * The base URL for the Pappers API
   * @title Base URL
   * @description The base URL for the Pappers API
   */
  baseUrl?: PappersConfig['baseUrl']
}
