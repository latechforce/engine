import { z } from 'zod/v4'
import { httpTriggerValidator } from './service/http'
import { calendlyTriggerValidator } from './integration/calendly'
import { facebookLeadAdsTriggerValidator } from './integration/facebook/lead-ads'

export const triggerValidator = z
  .union([httpTriggerValidator, calendlyTriggerValidator, facebookLeadAdsTriggerValidator])
  .meta({
    title: 'Trigger',
    description: 'The trigger is the event that triggers the automation',
  })

export type TriggerSchema = z.infer<typeof triggerValidator>
