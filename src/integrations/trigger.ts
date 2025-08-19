import { AirtableTriggerIntegration } from './airtable/airtable-trigger'
import { CalendlyTriggerIntegration } from './calendly/calendly-trigger'
import type { IntegrationTriggerSchema } from './trigger.schema'
import { LinkedinAdsTriggerIntegration } from './linkedin/ads/linkedin-ads-trigger'
import { FacebookAdsTriggerIntegration } from './facebook/ads/facebook-ads-trigger'

export const toTriggerIntegration = (trigger: IntegrationTriggerSchema, automationId: number) => {
  switch (trigger.service) {
    case 'calendly':
      return new CalendlyTriggerIntegration(trigger, automationId)
    case 'airtable':
      return new AirtableTriggerIntegration(trigger, automationId)
    case 'linkedin-ads':
      return new LinkedinAdsTriggerIntegration(trigger, automationId)
    case 'facebook-ads':
      return new FacebookAdsTriggerIntegration(trigger, automationId)
    default: {
      const _exhaustiveCheck: never = trigger
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
