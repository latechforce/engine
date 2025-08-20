import { AirtableTriggerIntegration } from '../productivity/airtable/airtable-trigger'
import { CalendlyTriggerIntegration } from '../productivity/calendly/calendly-trigger'
import type { IntegrationTriggerSchema } from './trigger.schema'
import { LinkedinAdsTriggerIntegration } from '../social/linkedin/ads/linkedin-ads-trigger'
import { FacebookAdsTriggerIntegration } from '../social/facebook/ads/facebook-ads-trigger'

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
