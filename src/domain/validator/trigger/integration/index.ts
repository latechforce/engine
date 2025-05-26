import { z } from 'zod/v4'
import { calendlyTriggerValidator } from './calendly'
import { facebookLeadAdsTriggerValidator } from './facebook/lead-ads'
import { linkedinAdsTriggerValidator } from './linkedin/ads'

export const integrationTriggerValidator = z.union([
  calendlyTriggerValidator,
  facebookLeadAdsTriggerValidator,
  linkedinAdsTriggerValidator,
])

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerValidator>
