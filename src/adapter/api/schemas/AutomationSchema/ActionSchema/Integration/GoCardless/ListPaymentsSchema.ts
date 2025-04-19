import type { ListPaymentsGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/ListPayments'

/**
 * Interface for listing payments from GoCardless
 * @title List Payments
 * @description Lists payments using GoCardless integration with optional filters
 */
export interface ListPaymentsGoCardlessIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: ListPaymentsGoCardlessActionConfig['name']
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
  action: 'ListPayments'
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: ListPaymentsGoCardlessActionConfig['account']
  /**
   * The parameters for this action
   * @title Parameters
   * @description The parameters for this action
   */
  params: ListPaymentsGoCardlessActionConfig['params']
}
