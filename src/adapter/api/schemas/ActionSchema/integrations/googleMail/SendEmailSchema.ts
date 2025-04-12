import type { SendEmailGoogleMailActionConfig } from '/domain/entities/Action/integrations/googleMail/SendEmail'

/**
 * Interface for sending an email through Google Mail
 * @title Send Email Google Mail Action
 * @description Sends an email using Google Mail integration
 *
 * @example
 * {
 *   integration: 'GoogleMail',
 *   action: 'SendEmail',
 *   email: {
 *     to: 'recipient@example.com',
 *     subject: 'Test Email',
 *     text: 'This is a test email'
 *   }
 * }
 */
export interface SendEmailGoogleMailActionSchema extends SendEmailGoogleMailActionConfig {
  integration: 'GoogleMail'
  action: 'SendEmail'
}
