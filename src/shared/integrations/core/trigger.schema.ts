import { z } from 'zod/v4'
import { calendlyTriggerSchema } from '../productivity/calendly/calendly-trigger.schema'
import { airtableTriggerSchema } from '../productivity/airtable/airtable-trigger.schema'
import { linkedinAdsTriggerSchema } from '../social/linkedin/ads/linkedin-ads-trigger.schema'
import { facebookAdsTriggerSchema } from '../social/facebook/ads/facebook-ads-trigger.schema'

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
