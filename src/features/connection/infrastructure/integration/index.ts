import { CalendlyConnectionIntegration } from './calendly.integration'
import type { Connection } from '../../domain/entity/connection.entity'
import { LinkedInAdsConnectionIntegration } from './linkedin-ads.integration'
import { FacebookLeadAdsConnectionIntegration } from './facebook-lead-ads.integration'
import { GoogleConnectionIntegration } from './google.integration'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | LinkedInAdsConnectionIntegration
  | FacebookLeadAdsConnectionIntegration
  | GoogleConnectionIntegration

// Cache to store integration instances
const integrationCache = new Map<number, ConnectionIntegration>()

export const toConnectionIntegration = (connection: Connection): ConnectionIntegration => {
  // Check if we already have a cached instance
  const cachedIntegration = integrationCache.get(connection.schema.id)
  if (cachedIntegration) {
    return cachedIntegration
  }

  // Create new instance if not cached
  let integration: ConnectionIntegration
  switch (connection.schema.service) {
    case 'calendly':
      integration = new CalendlyConnectionIntegration(
        connection.schema,
        connection.redirectUriWithState
      )
      break
    case 'google-sheets':
      integration = new GoogleConnectionIntegration(connection.schema, connection.redirectUri, [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ])
      break
    case 'google-gmail':
      integration = new GoogleConnectionIntegration(connection.schema, connection.redirectUri, [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.modify',
      ])
      break
    case 'facebook-lead-ads':
      integration = new FacebookLeadAdsConnectionIntegration(
        connection.schema,
        connection.redirectUriWithState
      )
      break
    case 'linkedin-ads':
      integration = new LinkedInAdsConnectionIntegration(
        connection.schema,
        connection.redirectUriWithState
      )
      break
    default: {
      const _exhaustiveCheck: never = connection.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }

  // Store in cache before returning
  integrationCache.set(connection.schema.id, integration)
  return integration
}
