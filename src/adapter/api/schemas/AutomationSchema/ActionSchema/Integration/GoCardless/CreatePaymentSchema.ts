import type { CreatePaymentGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/CreatePayment'

/**
 * Interface for creating a payment in GoCardless
 * @title Create Payment
 * @description Creates a new payment in GoCardless with the specified details
 */
export interface CreatePaymentGoCardlessIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: CreatePaymentGoCardlessActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'GoCardless'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'CreatePayment'
  /**
   * The payment for this action
   * @title Payment
   * @description The payment for this action
   */
  payment: CreatePaymentGoCardlessActionConfig['payment']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: CreatePaymentGoCardlessActionConfig['account']
}
