import type { CreatePaymentGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/CreatePayment'

/**
 * Interface for creating a payment in GoCardless
 * @title Create Payment
 * @description Creates a new payment in GoCardless with the specified details
 *
 * @example
 * {
 *   integration: 'GoCardless',
 *   action: 'CreatePayment',
 *   payment: {
 *     amount: 1000,
 *     currency: 'EUR',
 *     description: 'Monthly subscription',
 *     mandate: '{{trigger.payload.mandateId}}',
 *     metadata: {
 *       orderId: '{{trigger.payload.orderId}}',
 *       customerId: '{{trigger.payload.customerId}}'
 *     }
 *   }
 * }
 *
 */
export interface CreatePaymentGoCardlessIntegrationActionAutomationSchema
  extends CreatePaymentGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'CreatePayment'
}
