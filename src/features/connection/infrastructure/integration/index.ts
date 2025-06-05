import { CalendlyConnectionIntegration } from './calendly.integration'
import type { Connection } from '../../domain/entity/connection.entity'
import { LinkedInAdsConnectionIntegration } from './linkedin-ads.integration'
import { FacebookLeadAdsConnectionIntegration } from './facebook-lead-ads.integration'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | LinkedInAdsConnectionIntegration
  | FacebookLeadAdsConnectionIntegration

export const toConnectionIntegration = (connection: Connection): ConnectionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyConnectionIntegration(connection.schema, connection.redirectUri)
    case 'google-sheets':
      throw new Error('Google Sheets is not supported yet')
    case 'facebook-lead-ads':
      return new FacebookLeadAdsConnectionIntegration(connection.schema, connection.redirectUri)
    case 'linkedin-ads':
      return new LinkedInAdsConnectionIntegration(connection.schema, connection.redirectUri)
    default: {
      const _exhaustiveCheck: never = connection.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
