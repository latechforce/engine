import { CalendlyConnectionIntegration } from './calendly/calendly-connection'
import { LinkedInAdsConnectionIntegration } from './linkedin/ads/linkedin-ads-connection'
import { FacebookLeadAdsConnectionIntegration } from './facebook/lead-ads/facebook-lead-ads-connection'
import { GoogleConnectionIntegration } from './google/google-connection'
import { AirtableConnectionIntegration } from './airtable/airtable-connection'
import type { Connection } from '../features/connection/domain/entity/connection.entity'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | AirtableConnectionIntegration
  | LinkedInAdsConnectionIntegration
  | FacebookLeadAdsConnectionIntegration
  | GoogleConnectionIntegration

// Cache to store integration instances
const integrationCache = new Map<number, ConnectionIntegration>()

export const toConnectionIntegration = (
  connection: Connection,
  redirectUri: string
): ConnectionIntegration => {
  // Check if we already have a cached instance
  const cachedIntegration = integrationCache.get(connection.id)
  if (cachedIntegration) {
    return cachedIntegration
  }

  const redirectUriWithState = redirectUri + '?state=' + connection.state

  // Create new instance if not cached
  let integration: ConnectionIntegration
  switch (connection.schema.service) {
    case 'calendly':
      integration = new CalendlyConnectionIntegration(connection.schema, redirectUriWithState)
      break
    case 'airtable':
      integration = new AirtableConnectionIntegration(
        connection.schema,
        redirectUri,
        connection.state
      )
      break
    case 'google-sheets':
      integration = new GoogleConnectionIntegration(
        connection.schema,
        redirectUri,
        connection.state,
        [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
        ]
      )
      break
    case 'google-gmail':
      integration = new GoogleConnectionIntegration(
        connection.schema,
        redirectUri,
        connection.state,
        [
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/gmail.readonly',
          'https://www.googleapis.com/auth/gmail.modify',
        ]
      )
      break
    case 'facebook-lead-ads':
      integration = new FacebookLeadAdsConnectionIntegration(
        connection.schema,
        redirectUriWithState
      )
      break
    case 'linkedin-ads':
      integration = new LinkedInAdsConnectionIntegration(connection.schema, redirectUriWithState)
      break
    default: {
      const _exhaustiveCheck: never = connection.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }

  // Store in cache before returning
  integrationCache.set(connection.id, integration)
  return integration
}
