import { z } from 'zod/v4'
import { calendlyTriggerValidator } from './calendly'
import { facebookLeadAdsTriggerValidator } from './facebook/lead-ads'

export const integrationTriggerValidator = z.union([
  calendlyTriggerValidator,
  facebookLeadAdsTriggerValidator,
])

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerValidator>
