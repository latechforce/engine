import { CalendlyActionIntegration } from './calendly/calendly-action'
import type { IntegrationActionSchema } from './action.schema'
import { GoogleGmailActionIntegration } from './google/gmail/google-gmail-action'
import { GoogleSheetsActionIntegration } from './google/sheets/google-sheets-action'
import type { ConnectionSchema } from './connection.schema'
import { AirtableActionIntegration } from './airtable/airtable-action'
import { LinkedinAdsActionIntegration } from './linkedin/ads/linkedin-ads-action'
import { FacebookActionIntegration } from './facebook/facebook-action'

export const toActionIntegration = (
  action: IntegrationActionSchema,
  connection: ConnectionSchema,
  redirectUri: string
) => {
  switch (action.service) {
    case 'calendly':
      return new CalendlyActionIntegration(action)
    case 'airtable':
      return new AirtableActionIntegration(action)
    case 'linkedin-ads':
      if (connection.service !== 'linkedin-ads') {
        throw new Error('Connection and action services do not match')
      }
      return new LinkedinAdsActionIntegration(action)
    case 'google-sheets':
      if (connection.service !== 'google-sheets') {
        throw new Error('Connection and action services do not match')
      }
      return new GoogleSheetsActionIntegration(action, connection, redirectUri)
    case 'google-gmail':
      if (connection.service !== 'google-gmail') {
        throw new Error('Connection and action services do not match')
      }
      return new GoogleGmailActionIntegration(action, connection, redirectUri)
    case 'facebook':
      if (connection.service !== 'facebook') {
        throw new Error('Connection and action services do not match')
      }
      return new FacebookActionIntegration(action)
    default: {
      const _exhaustiveCheck: never = action
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
