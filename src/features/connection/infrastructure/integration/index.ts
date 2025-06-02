import { CalendlyConnectionIntegration } from './calendly.integration'
import type { Connection } from '@/connection/domain/entity/connection.entity'

export type ConnectionIntegration = CalendlyConnectionIntegration

export const toConnectionIntegration = (connection: Connection): ConnectionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyConnectionIntegration(connection.schema, connection.appBaseUrl)
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
