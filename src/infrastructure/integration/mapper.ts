import type { Connection } from '@/domain/entity/connection.entity'
import { CalendlyIntegration } from './calendly'
import type { Integration } from '.'

export const mapIntegration = (connection: Connection): Integration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyIntegration(connection)
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
