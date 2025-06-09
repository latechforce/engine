import { CalendlyTriggerIntegration } from './calendly'
import type { IntegrationTriggerSchema } from '../../domain/schema/integration'

export type TriggerIntegration = CalendlyTriggerIntegration

export const toTriggerIntegration = (
  schema: IntegrationTriggerSchema,
  automationId: number
): TriggerIntegration => {
  switch (schema.service) {
    case 'calendly':
      return new CalendlyTriggerIntegration(schema, automationId)
    case 'facebook-lead-ads':
      throw new Error('Facebook Lead Ads is not supported yet')
    case 'linkedin-ads':
      throw new Error('LinkedIn Ads is not supported yet')
    default: {
      const _exhaustiveCheck: never = schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
