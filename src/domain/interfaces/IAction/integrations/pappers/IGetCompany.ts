import type { GetCompanyPappersActionConfig } from '/domain/entities/Action/integrations/pappers/GetCompany'

/**
 * Interface for retrieving company information from Pappers
 * @title Get Company Information Action
 * @description Retrieves detailed company information from Pappers using a SIREN number
 *
 * @example
 * {
 *   integration: 'Pappers',
 *   action: 'GetCompany',
 *   siren: '{{trigger.payload.siren}}'
 * }
 *
 * @property {string} integration - Always 'Pappers' for Pappers integration
 * @property {string} action - Always 'GetCompany' for company information retrieval
 * @property {string} siren - The SIREN number of the company to look up
 */
export interface IGetCompanyPappersAction extends GetCompanyPappersActionConfig {
  integration: 'Pappers'
  action: 'GetCompany'
}
