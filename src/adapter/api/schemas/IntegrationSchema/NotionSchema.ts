import type { NotionConfig } from '/domain/integrations/Notion'

/**
 * Notion configuration schema
 * @title Notion
 * @description A configuration schema for Notion integration
 * @example
 * {
 *   name: "project-management",
 *   token: "secret_1234567890ABCD",
 *   pollingInterval: 300000
 * }
 */
export type NotionIntegrationSchema = NotionConfig
