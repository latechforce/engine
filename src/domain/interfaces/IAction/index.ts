import type { ICreateRecordDatabaseAction } from './services/database/ICreateRecord'
import type { IRunJavascriptCodeAction } from './services/code/IRunJavascript'
import type { IRunTypescriptCodeAction } from './services/code/IRunTypescript'
import type { IReadRecordDatabaseAction } from './services/database/IReadRecord'
import type { IGetCompanyPappersAction } from './integrations/pappers/IGetCompany'
import type { ICreateClientQontoAction } from './integrations/qonto/ICreateClient'
import type { IUpdatePageNotionAction } from './integrations/notion/IUpdatePage'
import type { ISendEmailGoogleMailAction } from './integrations/googleMail/ISendEmail'
import type { ICreatePaymentGoCardlessAction } from './integrations/gocardless/ICreatePayment'
import type { IListPaymentsGoCardlessAction } from './integrations/gocardless/IListPayments'
import type { IRetrieveAttachmentQontoAction } from './integrations/qonto/IRetrieveAttachment'

/**
 * Action type union
 * @title Action types
 * @description Union type of all possible actions that can be performed in automations
 *
 * @example Database Actions
 * // Create a new record in a database table
 * {
 *   service: 'Database',
 *   action: 'CreateRecord',
 *   table: 'users',
 *   fields: {
 *     name: '{{trigger.payload.name}}',
 *     email: '{{trigger.payload.email}}'
 *   }
 * }
 *
 * // Read a record from a database table
 * {
 *   service: 'Database',
 *   action: 'ReadRecord',
 *   table: 'users',
 *   id: '{{trigger.payload.userId}}'
 * }
 *
 * @example Code Execution Actions
 * // Run JavaScript code
 * {
 *   service: 'Code',
 *   action: 'RunJavascript',
 *   input: {
 *     value: 5
 *   },
 *   code: 'function(context) { return { result: context.input.value * 2 } }',
 * }
 *
 * // Run TypeScript code
 * {
 *   service: 'Code',
 *   action: 'RunTypescript',
 *   input: {
 *     value: 5
 *   },
 *   code: 'function(context: CodeRunnerContext) { return { result: context.inputData.value * 2 } }',
 * }
 *
 * @example Integration Actions
 * // Send an email using Google Mail
 * {
 *   integration: 'GoogleMail',
 *   action: 'SendEmail',
 *   email: {
 *     to: '{{trigger.payload.email}}',
 *     subject: 'Welcome to our platform',
 *     text: 'Hello {{trigger.payload.name}}!'
 *   }
 * }
 *
 * // Update a Notion page
 * {
 *   integration: 'Notion',
 *   action: 'UpdatePage',
 *   table: 'projects',
 *   id: '{{trigger.payload.pageId}}',
 *   page: {
 *     status: 'In Progress',
 *     assignee: '{{trigger.payload.user}}'
 *   }
 * }
 *
 * // Get company information from Pappers
 * {
 *   integration: 'Pappers',
 *   action: 'GetCompany',
 *   siren: '{{trigger.payload.siren}}'
 * }
 *
 * // Create a client in Qonto
 * {
 *   integration: 'Qonto',
 *   action: 'CreateClient',
 *   client: {
 *     name: '{{trigger.payload.companyName}}',
 *     email: '{{trigger.payload.email}}'
 *   }
 * }
 *
 * // Create a payment in GoCardless
 * {
 *   integration: 'GoCardless',
 *   action: 'CreatePayment',
 *   payment: {
 *     amount: 1000,
 *     currency: 'EUR',
 *     description: 'Monthly subscription'
 *   }
 * }
 *
 * // List payments from GoCardless
 * {
 *   integration: 'GoCardless',
 *   action: 'ListPayments',
 *   filters: {
 *     status: 'paid',
 *     created_at: { gte: '2024-01-01' }
 *   }
 * }
 *
 * // Retrieve an attachment from Qonto
 * {
 *   integration: 'Qonto',
 *   action: 'RetrieveAttachment',
 *   attachmentId: '{{trigger.payload.attachmentId}}'
 * }
 */
export type IAction =
  | IRunJavascriptCodeAction
  | IRunTypescriptCodeAction
  | ICreateRecordDatabaseAction
  | IReadRecordDatabaseAction
  | IGetCompanyPappersAction
  | ICreateClientQontoAction
  | IUpdatePageNotionAction
  | ISendEmailGoogleMailAction
  | ICreatePaymentGoCardlessAction
  | IListPaymentsGoCardlessAction
  | IRetrieveAttachmentQontoAction
