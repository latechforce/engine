import type { SendEmailGoogleMailActionConfig } from '/domain/entities/Action/integrations/googleMail/SendEmail'

/**
 * Interface for sending an email using Google Mail
 * @title Send Email Action
 * @description Sends an email using Google Mail with specified recipients, subject, and content
 *
 * @example
 * {
 *   integration: 'GoogleMail',
 *   action: 'SendEmail',
 *   email: {
 *     to: '{{trigger.payload.email}}',
 *     cc: ['team@example.com'],
 *     bcc: ['archive@example.com'],
 *     subject: 'Welcome to our platform',
 *     text: 'Hello {{trigger.payload.name}}!',
 *     html: '<h1>Welcome</h1><p>Hello {{trigger.payload.name}}!</p>',
 *     attachments: [
 *       {
 *         filename: 'document.pdf',
 *         content: '{{trigger.payload.document}}'
 *       }
 *     ]
 *   }
 * }
 *
 * @property {string} integration - Always 'GoogleMail' for Google Mail integration
 * @property {string} action - Always 'SendEmail' for email sending
 * @property {object} email - Email configuration
 * @property {string|string[]} email.to - Recipient email address(es)
 * @property {string|string[]} [email.cc] - CC recipient email address(es)
 * @property {string|string[]} [email.bcc] - BCC recipient email address(es)
 * @property {string} email.subject - Email subject
 * @property {string} [email.text] - Plain text email content
 * @property {string} [email.html] - HTML email content
 * @property {object[]} [email.attachments] - Email attachments
 */
export interface ISendEmailGoogleMailAction extends SendEmailGoogleMailActionConfig {
  integration: 'GoogleMail'
  action: 'SendEmail'
}
