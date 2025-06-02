import type { Connection } from '@/connection/domain/entity/connection.entity'
import { CalendlyActionIntegration } from './calendly'
import { YouCanBookMeActionIntegration } from './youcanbookme'

export type ActionIntegration = CalendlyActionIntegration | YouCanBookMeActionIntegration

export const toActionIntegration = (connection: Connection): ActionIntegration => {
  switch (connection.schema.service) {
    case 'calendly':
      return new CalendlyActionIntegration()
    case 'youcanbookme':
      return new YouCanBookMeActionIntegration(
        connection.schema.baseUrl,
        connection.schema.username,
        connection.schema.password
      )
    default:
      throw new Error(`Integration not found for service: ${connection.schema.service}`)
  }
}
