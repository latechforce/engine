import type { CreateClientQontoActionConfig } from '/domain/entities/Action/integrations/qonto/CreateClient'

/**
 * Interface for creating a client in Qonto
 * @title Create Client
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
 */
export interface CreateClientQontoActionSchema extends CreateClientQontoActionConfig {
  integration: 'Qonto'
  action: 'CreateClient'
}
