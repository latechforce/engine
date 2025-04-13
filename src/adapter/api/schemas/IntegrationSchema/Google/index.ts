import type { MailGoogleIntegrationSchema } from './MailSchema'

/**
 * Google integration schema
 * @title Google
 * @description A configuration schema for Google integration
 * @example
 * {
 *   name: "support-email",
 *   user: "support@company.com",
 *   password: "app-specific-password"
 */
export type GoogleIntegrationSchema = {
  mail?: MailGoogleIntegrationSchema[]
}
