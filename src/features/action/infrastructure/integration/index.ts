import { CalendlyActionIntegration } from './calendly'
import type { IntegrationActionSchema } from '../../domain/schema/integration'

export type ActionIntegration = CalendlyActionIntegration

export const toActionIntegration = (schema: IntegrationActionSchema): ActionIntegration => {
  switch (schema.service) {
    case 'calendly':
      return new CalendlyActionIntegration(schema)
    case 'google-sheets':
      throw new Error('Google Sheets is not supported yet')
    default: {
      const _exhaustiveCheck: never = schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
