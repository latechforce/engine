import { z } from 'zod/v4'
import { calendlyTriggerValidator } from './calendly'

export const integrationTriggerValidator = z.union([calendlyTriggerValidator])

export type IntegrationTriggerSchema = z.infer<typeof integrationTriggerValidator>
