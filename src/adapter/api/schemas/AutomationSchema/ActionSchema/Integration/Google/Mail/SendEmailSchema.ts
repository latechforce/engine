import type { SendEmailGoogleMailActionConfig } from '/domain/entities/Action/integrations/googleMail/SendEmail'

/**
 * Interface for sending an email through Google Mail
 * @title Send Email
 * @description Sends an email using Google Mail integration
 */
export interface SendEmailMailGoogleIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: SendEmailGoogleMailActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'GoogleMail'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'SendEmail'
  /**
   * The email for this action
   * @title Email
   * @description The email for this action
   */
  email: SendEmailGoogleMailActionConfig['email']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: SendEmailGoogleMailActionConfig['account']
}
