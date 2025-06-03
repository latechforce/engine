import { CalendlyTriggerIntegration } from './calendly'
import type { Trigger } from '@/trigger/domain/entity/trigger.entity'

export type TriggerIntegration = CalendlyTriggerIntegration

export const toTriggerIntegration = (trigger: Trigger): TriggerIntegration => {
  switch (trigger.schema.service) {
    case 'calendly':
      return new CalendlyTriggerIntegration(trigger.schema)
    case 'facebook-lead-ads':
      throw new Error('Facebook Lead Ads is not supported yet')
    case 'linkedin-ads':
      throw new Error('LinkedIn Ads is not supported yet')
    case 'youcanbookme':
      throw new Error('YouCanBookMe is not supported yet')
    case 'http':
      throw new Error('HTTP is not supported yet')
    default: {
      const _exhaustiveCheck: never = trigger.schema
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}
