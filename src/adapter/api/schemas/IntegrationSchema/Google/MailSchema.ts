import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'

/**
 * Gmail configuration schema
 * @title Mail
 * @description A configuration schema for Gmail integration
 * @example
 * {
 *   name: "support-email",
 *   user: "support@company.com",
 *   password: "app-specific-password"
 * }
 */
export type MailGoogleIntegrationSchema = GoogleMailConfig
