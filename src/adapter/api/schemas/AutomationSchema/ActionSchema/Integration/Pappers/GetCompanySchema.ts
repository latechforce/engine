import type { GetCompanyPappersActionConfig } from '/domain/entities/Action/integrations/pappers/GetCompany'

/**
 * Interface for retrieving company information from Pappers
 * @title Get Company
 * @description Retrieves company information using Pappers integration
 */
export interface GetCompanyPappersIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: GetCompanyPappersActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'Pappers'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'GetCompany'
  /**
   * The siret for this action
   * @title Siret
   * @description The siret for this action
   */
  siret: GetCompanyPappersActionConfig['siret']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: GetCompanyPappersActionConfig['account']
}
