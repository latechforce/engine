import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'

/**
 * Zoom configuration schema
 * @title Zoom
 * @description A configuration schema for Zoom integration
 */
export interface ZoomIntegrationSchema {
  /**
   * The account identifier for Zoom
   * @title Account
   * @description The account identifier for Zoom
   */
  account: ZoomConfig['account']
  /**
   * The base URL for Zoom API
   * @title Base URL
   * @description The base URL for Zoom API
   */
  baseUrl?: ZoomConfig['baseUrl']
  /**
   * The access token for Zoom API authentication
   * @title Access Token
   * @description The access token for Zoom API authentication
   */
  accessToken?: string
  /**
   * The client ID for Zoom API authentication
   * @title Client ID
   * @description The client ID for Zoom API authentication
   */
  clientId: string
  /**
   * The client secret for Zoom API authentication
   * @title Client Secret
   * @description The client secret for Zoom API authentication
   */
  clientSecret: string
  /**
   * The base URL for Zoom API authentication
   * @title Base URL
   * @description The base URL for Zoom API authentication
   */
  authBaseUrl?: ZoomConfig['authBaseUrl']
}
