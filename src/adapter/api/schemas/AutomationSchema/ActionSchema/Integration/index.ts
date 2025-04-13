import type { CreatePaymentGoCardlessIntegrationActionAutomationSchema } from './GoCardless/CreatePaymentSchema'
import type { ListPaymentsGoCardlessIntegrationActionAutomationSchema } from './GoCardless/ListPaymentsSchema'
import type { SendEmailMailGoogleIntegrationActionAutomationSchema } from './Google/Mail/SendEmailSchema'
import type { UpdatePageNotionIntegrationActionAutomationSchema } from './Notion/UpdatePageSchema'
import type { GetCompanyPappersIntegrationActionAutomationSchema } from './Pappers/GetCompanySchema'
import type { CreateClientQontoIntegrationActionAutomationSchema } from './Qonto/CreateClientSchema'
import type { RetrieveAttachmentQontoIntegrationActionAutomationSchema } from './Qonto/RetrieveAttachmentSchema'

/**
 * Integration action type union
 * @title Integration
 * @description Union type of all possible integration actions that can be performed in automations
 * @example
 * {
 *   service: 'Integration',
 *   action: 'GetCompany',
 *   companyId: '123'
 * }
 */
export type IntegrationActionAutomationSchema =
  | GetCompanyPappersIntegrationActionAutomationSchema
  | CreateClientQontoIntegrationActionAutomationSchema
  | UpdatePageNotionIntegrationActionAutomationSchema
  | SendEmailMailGoogleIntegrationActionAutomationSchema
  | CreatePaymentGoCardlessIntegrationActionAutomationSchema
  | ListPaymentsGoCardlessIntegrationActionAutomationSchema
  | RetrieveAttachmentQontoIntegrationActionAutomationSchema
