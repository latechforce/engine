import { CalendlyConnectionIntegration } from './calendly.integration'
import type { Connection } from '@/connection/domain/entity/connection.entity'
import { YouCanBookMeConnectionIntegration } from './youcanbookme.integration'

export type ConnectionIntegration =
  | CalendlyConnectionIntegration
  | YouCanBookMeConnectionIntegration

export const toConnectionIntegration = (connection: Connection): ConnectionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyConnectionIntegration(connection.schema, connection.appBaseUrl)
    case 'youcanbookme':
      return new YouCanBookMeConnectionIntegration(connection.schema)
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
