import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'

/**
 * Gmail configuration schema
 * @title Mail
 * @description A configuration schema for Gmail integration
 */
export interface MailGoogleIntegrationSchema {
  /**
   * The account identifier for the Google Mail integration
   * @title Account
   * @description The account identifier for the Google Mail integration
   */
  account: GoogleMailConfig['account']
  /**
   * The user email address for Gmail authentication
   * @title User
   * @description The user email address for Gmail authentication
   */
  user: GoogleMailConfig['user']
  /**
   * The password or app password for Gmail authentication
   * @title Password
   * @description The password or app password for Gmail authentication
   */
  password: GoogleMailConfig['password']
  /**
   * The base URL for Gmail authentication
   * @title Base URL
   * @description The base URL for Gmail authentication
   */
  baseUrl?: GoogleMailConfig['baseUrl']
}
