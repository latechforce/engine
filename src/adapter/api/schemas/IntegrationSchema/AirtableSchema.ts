import type { AirtableConfig } from '/domain/integrations/Airtable'

/**
 * Airtable configuration schema
 * @title Airtable
 * @description A configuration schema for Airtable integration
 * @example
 * {
 *   name: "main-database",
 *   apiKey: "key1234567890ABCD",
 *   databaseId: "app1234567890ABCD"
 * }
 */
export type AirtableIntegrationSchema = AirtableConfig
