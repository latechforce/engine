// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { httpTriggerSchema } from './service/http'
import { calendlyTriggerSchema } from './integration/calendly'
import { facebookLeadAdsTriggerSchema } from './integration/facebook/lead-ads'
import { linkedinAdsTriggerSchema } from './integration/linkedin/ads'

export const triggerSchema = z
  .union([
    httpTriggerSchema,
    calendlyTriggerSchema,
    facebookLeadAdsTriggerSchema,
    linkedinAdsTriggerSchema,
  ])
  .meta({
    title: 'Trigger',
    description: 'The trigger is the event that triggers the automation',
  })

export type TriggerSchema = z.infer<typeof triggerSchema>
