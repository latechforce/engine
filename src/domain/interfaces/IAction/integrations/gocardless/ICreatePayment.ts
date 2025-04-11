import type { CreatePaymentGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/CreatePayment'

/**
 * Interface for creating a payment in GoCardless
 * @title Create GoCardless Payment Action
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
 * @property {string} integration - Always 'GoCardless' for GoCardless integration
 * @property {string} action - Always 'CreatePayment' for payment creation
 * @property {object} payment - Payment details
 * @property {number} payment.amount - Payment amount in minor units (e.g., cents)
 * @property {string} payment.currency - Payment currency code (e.g., 'EUR')
 * @property {string} payment.description - Payment description
 * @property {string} payment.mandate - ID of the mandate to charge
 * @property {object} [payment.metadata] - Additional metadata for the payment
 */
export interface ICreatePaymentGoCardlessAction extends CreatePaymentGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'CreatePayment'
}
