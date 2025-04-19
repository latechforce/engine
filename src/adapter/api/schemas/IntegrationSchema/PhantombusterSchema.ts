import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'

/**
 * Phantombuster configuration schema
 * @title Phantombuster
 * @description A configuration schema for Phantombuster automation integration
 */
export interface PhantombusterIntegrationSchema {
  /**
   * The Phantombuster account identifier
   * @title Account
   * @description The Phantombuster account identifier
   */
  account: PhantombusterConfig['account']
  /**
   * The Phantombuster API key
   * @title API Key
   * @description The Phantombuster API key for authentication
   */
  apiKey: PhantombusterConfig['apiKey']
  /**
   * The base URL for Phantombuster API
   * @title Base URL
   * @description The base URL for Phantombuster API
   */
  baseUrl?: PhantombusterConfig['baseUrl']
}
