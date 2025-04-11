import type { ListPaymentsGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/ListPayments'

/**
 * Interface for listing payments from GoCardless
 * @title List GoCardless Payments Action
 * @description Retrieves a list of payments from GoCardless based on specified filters
 *
 * @example
 * {
 *   integration: 'GoCardless',
 *   action: 'ListPayments',
 *   filters: {
 *     status: 'paid',
 *     created_at: { gte: '2024-01-01' },
 *     mandate: '{{trigger.payload.mandateId}}',
 *     limit: 100,
 *     after: '{{trigger.payload.lastPaymentId}}'
 *   }
 * }
 *
 * @property {string} integration - Always 'GoCardless' for GoCardless integration
 * @property {string} action - Always 'ListPayments' for payment listing
 * @property {object} filters - Filter criteria for payments
 * @property {string} [filters.status] - Payment status (e.g., 'paid', 'pending', 'failed')
 * @property {object} [filters.created_at] - Date range filter
 * @property {string} [filters.mandate] - Filter by mandate ID
 * @property {number} [filters.limit] - Maximum number of payments to return
 * @property {string} [filters.after] - Cursor for pagination
 */
export interface IListPaymentsGoCardlessAction extends ListPaymentsGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'ListPayments'
}
