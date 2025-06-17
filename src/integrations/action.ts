import { CalendlyActionIntegration } from './calendly/calendly-action'
import type { IntegrationActionSchema } from './action.schema'

export const toActionIntegration = (action: IntegrationActionSchema) => {
  switch (action.service) {
    case 'calendly':
      return new CalendlyActionIntegration(action)
    case 'google-sheets':
      throw new Error('Google Sheets integration not implemented')
    case 'google-gmail':
      throw new Error('Google Gmail integration not implemented')
    default: {
      const _exhaustiveCheck: never = action
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
