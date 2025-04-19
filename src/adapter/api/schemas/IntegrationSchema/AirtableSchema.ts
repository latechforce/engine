import type { AirtableConfig } from '/domain/integrations/Airtable'

/**
 * Airtable configuration schema
 * @title Airtable
 * @description A configuration schema for Airtable integration
 */
export interface AirtableIntegrationSchema {
  /**
   * The account identifier for the Airtable integration
   * @title Account
   * @description The account identifier for the Airtable integration
   */
  account: AirtableConfig['account']
  /**
   * The base URL for Airtable API
   * @title Base URL
   * @description The base URL for Airtable API
   */
  baseUrl?: AirtableConfig['baseUrl']
  /**
   * The API key for Airtable
   * @title API Key
   * @description The API key for Airtable
   */
  apiKey: AirtableConfig['apiKey']
  /**
   * The database ID for Airtable
   * @title Database ID
   * @description The database ID for Airtable
   */
  databaseId: AirtableConfig['databaseId']
}
