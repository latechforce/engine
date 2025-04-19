import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe'

/**
 * YouCanBookMe configuration schema
 * @title YouCanBookMe
 * @description A configuration schema for YouCanBookMe scheduling integration
 */
export interface YouCanBookMeIntegrationSchema {
  /**
   * The account identifier for YouCanBookMe
   * @title Account
   * @description The account identifier for YouCanBookMe
   */
  account: YouCanBookMeConfig['account']
  /**
   * The username for YouCanBookMe
   * @title Username
   * @description The username for YouCanBookMe
   */
  username: string
  /**
   * The password for YouCanBookMe
   * @title Password
   * @description The password for YouCanBookMe
   */
  password: string
  /**
   * The base URL for YouCanBookMe API
   * @title Base URL
   * @description The base URL for YouCanBookMe API
   */
  baseUrl?: YouCanBookMeConfig['baseUrl']
}
