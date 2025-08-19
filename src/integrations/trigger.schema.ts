import { z } from 'zod/v4'
import { calendlyTriggerSchema } from './calendly/calendly-trigger.schema'
import { airtableTriggerSchema } from './airtable/airtable-trigger.schema'
import { linkedinAdsTriggerSchema } from './linkedin/ads/linkedin-ads-trigger.schema'
import { facebookAdsTriggerSchema } from './facebook/ads/facebook-ads-trigger.schema'

export const integrationTriggerSchema = z
  .union([
    calendlyTriggerSchema,
    airtableTriggerSchema,
    linkedinAdsTriggerSchema,
    facebookAdsTriggerSchema,
  ])
  .meta({
    title: 'Integration Trigger',
    description: 'The integration trigger is the event that triggers the automation',
  })

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerSchema>
