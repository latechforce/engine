import { CalendlyConnectionIntegration } from './calendly.integration'
import type { Connection } from '../../domain/entity/connection.entity'

export type ConnectionIntegration = CalendlyConnectionIntegration

export const toConnectionIntegration = (connection: Connection): ConnectionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyConnectionIntegration(connection.schema, connection.redirectUri)
    case 'google-sheets':
      throw new Error('Google Sheets is not supported yet')
    case 'facebook-lead-ads':
      throw new Error('Facebook Lead Ads is not supported yet')
    case 'linkedin-ads':
      throw new Error('LinkedIn Ads is not supported yet')
    default: {
      const _exhaustiveCheck: never = connection.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
