import type { Connection } from '@/connection/domain/entity/connection.entity'
import { CalendlyTriggerIntegration } from './calendly'

export type TriggerIntegration = CalendlyTriggerIntegration

export const toTriggerIntegration = (connection: Connection): TriggerIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyTriggerIntegration()
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
