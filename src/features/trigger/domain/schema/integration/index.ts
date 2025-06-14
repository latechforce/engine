// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { calendlyTriggerSchema } from './calendly'
import { facebookLeadAdsTriggerSchema } from './facebook/lead-ads'
import { linkedinAdsTriggerSchema } from './linkedin/ads'

export const integrationTriggerSchema = z.union([
  calendlyTriggerSchema,
  facebookLeadAdsTriggerSchema,
  linkedinAdsTriggerSchema,
])

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerSchema>
