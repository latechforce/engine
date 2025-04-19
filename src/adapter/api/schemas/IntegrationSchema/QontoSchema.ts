import type { QontoConfig } from '/domain/integrations/Qonto'

/**
 * Qonto configuration schema
 * @title Qonto
 * @description A configuration schema for Qonto banking integration
 */
export interface QontoIntegrationSchema {
  /**
   * The account identifier for the Qonto integration
   * @title Account
   * @description The account identifier for the Qonto integration
   */
  account: QontoConfig['account']
  /**
   * The organisation slug for Qonto API authentication
   * @title Organisation Slug
   * @description The unique identifier for your Qonto organisation
   */
  organisationSlug: QontoConfig['organisationSlug']
  /**
   * The secret key for Qonto API authentication
   * @title Secret Key
   * @description The API secret key used to authenticate with Qonto
   */
  secretKey: QontoConfig['secretKey']
  /**
   * The staging token for Qonto API testing
   * @title Staging Token
   * @description Optional token used for testing with Qonto staging environment
   */
  stagingToken?: QontoConfig['stagingToken']
  /**
   * The base URL for Qonto API
   * @title Base URL
   * @description Optional custom base URL for Qonto API endpoints
   */
  baseUrl?: QontoConfig['baseUrl']
}
