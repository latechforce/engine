import type { NotionConfig } from '/domain/integrations/Notion'

/**
 * Notion configuration schema
 * @title Notion
 * @description A configuration schema for Notion integration
 */
export interface NotionIntegrationSchema {
  /**
   * The account identifier for the Notion integration
   * @title Account
   * @description The account identifier for the Notion integration
   */
  account: NotionConfig['account']
  /**
   * The base URL for the Notion API
   * @title Base URL
   * @description The base URL for the Notion API
   */
  baseUrl?: NotionConfig['baseUrl']
  /**
   * The authentication token for the Notion API
   * @title Token
   * @description The authentication token for the Notion API
   */
  token: NotionConfig['token']
  /**
   * The interval in milliseconds for polling Notion API
   * @title Polling Interval
   * @description The interval in milliseconds for polling Notion API
   */
  pollingInterval?: NotionConfig['pollingInterval']
}
