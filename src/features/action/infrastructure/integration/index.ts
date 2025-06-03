import { CalendlyActionIntegration } from './calendly'
import type { IntegrationAction } from '@/action/domain/entity/integration-action.entity'

export type ActionIntegration = CalendlyActionIntegration

export const toActionIntegration = (action: IntegrationAction): ActionIntegration => {
  switch (action.schema.service) {
    case 'calendly':
      return new CalendlyActionIntegration(action.schema)
    case 'google-sheets':
      throw new Error('Google Sheets is not supported yet')
    default: {
      const _exhaustiveCheck: never = action.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
