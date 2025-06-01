import type { Connection } from '@/connection/domain/entity/connection.entity'
import { CalendlyActionIntegration } from './calendly'

export type ActionIntegration = CalendlyActionIntegration

export const toActionIntegration = (connection: Connection): ActionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyActionIntegration()
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
