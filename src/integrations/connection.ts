import { CalendlyConnectionIntegration } from './calendly/calendly-connection'
import { GoogleConnectionIntegration } from './google/google-connection'
import { AirtableConnectionIntegration } from './airtable/airtable-connection'
import { LinkedinConnectionIntegration } from './linkedin/linkedin-connection'
import { FacebookConnectionIntegration } from './facebook/facebook-connection'
import type { Connection } from '../features/connection/domain/entity/connection.entity'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | AirtableConnectionIntegration
  | GoogleConnectionIntegration
  | LinkedinConnectionIntegration
  | FacebookConnectionIntegration

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
    case 'linkedin-ads':
      integration = new LinkedinConnectionIntegration(connection.schema, redirectUri, [
        'r_liteprofile',
        'r_events',
        'r_ads',
        'r_organization_admin',
        'r_marketing_leadgen_automation',
        'r_ads_leadgen_automation',
      ])
      break
    case 'facebook-ads':
      integration = new FacebookConnectionIntegration(connection.schema, redirectUri, [
        'ads_management',
        'ads_read',
        'business_management',
        'pages_manage_ads',
        'pages_read_engagement',
        'pages_show_list',
        'leads_retrieval',
      ])
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
    default: {
      const _exhaustiveCheck: never = connection.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }

  // Store in cache before returning
  integrationCache.set(connection.id, integration)
  return integration
}
