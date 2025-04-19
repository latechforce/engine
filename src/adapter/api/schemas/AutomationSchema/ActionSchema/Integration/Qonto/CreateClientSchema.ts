import type { CreateClientQontoActionConfig } from '/domain/entities/Action/integrations/qonto/CreateClient'

/**
 * Interface for creating a client in Qonto
 * @title Create Client
 * @description Creates a new client in Qonto with the specified details
 */
export interface CreateClientQontoIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: CreateClientQontoActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'Qonto'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'CreateClient'
  /**
   * The client for this action
   * @title Client
   * @description The client for this action
   */
  client: CreateClientQontoActionConfig['client']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: CreateClientQontoActionConfig['account']
}
