import { z } from 'zod/v4'
import { calendlyTriggerSchema } from './calendly/calendly-trigger.schema'
import { linkedinAdsTriggerSchema } from './linkedin/ads/linkedin-ads-trigger.schema'
import { facebookLeadAdsTriggerSchema } from './facebook/lead-ads/facebook-lead-ads-trigger.schema'

export const integrationTriggerSchema = z
  .union([calendlyTriggerSchema, facebookLeadAdsTriggerSchema, linkedinAdsTriggerSchema])
  .meta({
    title: 'Integration Trigger',
    description: 'The integration trigger is the event that triggers the automation',
  })

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerSchema>
