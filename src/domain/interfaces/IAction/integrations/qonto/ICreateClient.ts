import type { CreateClientQontoActionConfig } from '/domain/entities/Action/integrations/qonto/CreateClient'

/**
 * Interface for creating a client in Qonto
 * @title Create Qonto Client Action
 * @description Creates a new client in Qonto with the specified details
 *
 * @example
 * {
 *   integration: 'Qonto',
 *   action: 'CreateClient',
 *   client: {
 *     name: '{{trigger.payload.companyName}}',
 *     email: '{{trigger.payload.email}}',
 *     phone: '{{trigger.payload.phone}}',
 *     address: {
 *       street: '{{trigger.payload.street}}',
 *       city: '{{trigger.payload.city}}',
 *       postalCode: '{{trigger.payload.postalCode}}',
 *       country: '{{trigger.payload.country}}'
 *     }
 *   }
 * }
 *
 * @property {string} integration - Always 'Qonto' for Qonto integration
 * @property {string} action - Always 'CreateClient' for client creation
 * @property {object} client - Client details
 * @property {string} client.name - Company name
 * @property {string} client.email - Contact email
 * @property {string} [client.phone] - Contact phone number
 * @property {object} [client.address] - Company address
 */
export interface ICreateClientQontoAction extends CreateClientQontoActionConfig {
  integration: 'Qonto'
  action: 'CreateClient'
}
