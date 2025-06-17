import { CalendlyActionIntegration } from './calendly/calendly-action'
import type { IntegrationActionSchema } from './action.schema'
import { GoogleGmailActionIntegration } from './google/gmail/google-gmail-action'
import type { ConnectionSchema } from './connection.schema'

export const toActionIntegration = (
  action: IntegrationActionSchema,
  connection: ConnectionSchema,
  redirectUri: string
) => {
  switch (action.service) {
    case 'calendly':
      return new CalendlyActionIntegration(action)
    case 'google-sheets':
      throw new Error('Google Sheets integration not implemented')
    case 'google-gmail':
      if (connection.service !== 'google-gmail') {
        throw new Error('Connection and action services do not match')
      }
      return new GoogleGmailActionIntegration(action, connection, redirectUri)
    default: {
      const _exhaustiveCheck: never = action
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
