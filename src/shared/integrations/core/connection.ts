import { CalendlyConnectionIntegration } from '../productivity/calendly/calendly-connection'
import { GoogleConnectionIntegration } from '../communication/google/google-connection'
import { AirtableConnectionIntegration } from '../productivity/airtable/airtable-connection'
import { LinkedinConnectionIntegration } from '../social/linkedin/linkedin-connection'
import { FacebookConnectionIntegration } from '../social/facebook/facebook-connection'
import type { Connection } from '../../../features/connection/domain/entity/connection.entity'
import { NotionConnectionIntegration } from '../productivity/notion/notion-connection'
import { QontoConnectionIntegration } from '../financial/qonto/qonto-connection'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | AirtableConnectionIntegration
  | GoogleConnectionIntegration
  | LinkedinConnectionIntegration
  | FacebookConnectionIntegration
  | NotionConnectionIntegration
  | QontoConnectionIntegration

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
        'business_management',
        'pages_manage_ads',
        'pages_read_engagement',
        'pages_show_list',
        'pages_manage_metadata',
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
    case 'notion':
      integration = new NotionConnectionIntegration(
        connection.schema,
        redirectUri,
        connection.state
      )
      break
    case 'qonto':
      integration = new QontoConnectionIntegration(connection.schema, redirectUri, connection.state)
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
