import { AirtableTriggerIntegration } from './airtable/airtable-trigger'
import { CalendlyTriggerIntegration } from './calendly/calendly-trigger'
import type { IntegrationTriggerSchema } from './trigger.schema'
import { LinkedinTriggerIntegration } from './linkedin/linkedin-trigger'
import { FacebookTriggerIntegration } from './facebook/facebook-trigger'

export const toTriggerIntegration = (trigger: IntegrationTriggerSchema, automationId: number) => {
  switch (trigger.service) {
    case 'calendly':
      return new CalendlyTriggerIntegration(trigger, automationId)
    case 'airtable':
      return new AirtableTriggerIntegration(trigger, automationId)
    case 'linkedin':
      return new LinkedinTriggerIntegration(trigger, automationId)
    case 'facebook':
      return new FacebookTriggerIntegration(trigger, automationId)
    default: {
      const _exhaustiveCheck: never = trigger
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
