import type { CreatePaymentGoCardlessIntegrationActionAutomationSchema } from './CreatePaymentSchema'
import type { ListPaymentsGoCardlessIntegrationActionAutomationSchema } from './ListPaymentsSchema'

/**
 * The schema for the GoCardless integration action.
 * @title GoCardless
 * @description The GoCardless integration action.
 */
export type GoCardlessIntegrationActionAutomationSchema =
  | CreatePaymentGoCardlessIntegrationActionAutomationSchema
  | ListPaymentsGoCardlessIntegrationActionAutomationSchema
