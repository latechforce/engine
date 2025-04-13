import type { ListPaymentsGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/ListPayments'

/**
 * Interface for listing payments from GoCardless
 * @title List Payments
 * @description Lists payments using GoCardless integration with optional filters
 *
 * @example
 * {
 *   integration: 'GoCardless',
 *   action: 'ListPayments',
 *   filters: {
 *     status: 'paid',
 *     limit: 10
 *   }
 * }
 */
export interface ListPaymentsGoCardlessActionSchema extends ListPaymentsGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'ListPayments'
}
