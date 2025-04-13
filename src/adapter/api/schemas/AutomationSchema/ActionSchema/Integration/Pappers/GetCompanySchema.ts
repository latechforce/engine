import type { GetCompanyPappersActionConfig } from '/domain/entities/Action/integrations/pappers/GetCompany'

/**
 * Interface for retrieving company information from Pappers
 * @title Get Company
 * @description Retrieves company information using Pappers integration
 *
 * @example
 * {
 *   integration: 'Pappers',
 *   action: 'GetCompany',
 *   siren: '123456789'
 * }
 */
export interface GetCompanyPappersIntegrationActionAutomationSchema
  extends GetCompanyPappersActionConfig {
  integration: 'Pappers'
  action: 'GetCompany'
}
