import { z } from 'zod/v4'
import { calendlyTriggerSchema } from './calendly/calendly-trigger.schema'
import { facebookLeadAdsTriggerSchema } from './facebook/lead-ads/facebook-lead-ads-trigger.schema'
import { airtableTriggerSchema } from './airtable/airtable-trigger.schema'

export const integrationTriggerSchema = z
  .union([calendlyTriggerSchema, airtableTriggerSchema, facebookLeadAdsTriggerSchema])
  .meta({
    title: 'Integration Trigger',
    description: 'The integration trigger is the event that triggers the automation',
  })

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerSchema>
