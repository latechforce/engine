// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { httpTriggerValidator } from './service/http'
import { calendlyTriggerValidator } from './integration/calendly'
import { facebookLeadAdsTriggerValidator } from './integration/facebook/lead-ads'
import { linkedinAdsTriggerValidator } from './integration/linkedin/ads'
import { youcanbookmeTriggerValidator } from './integration/youcanbookme'

export const triggerValidator = z
  .union([
    httpTriggerValidator,
    calendlyTriggerValidator,
    facebookLeadAdsTriggerValidator,
    linkedinAdsTriggerValidator,
    youcanbookmeTriggerValidator,
  ])
  .meta({
    title: 'Trigger',
    description: 'The trigger is the event that triggers the automation',
  })

export type TriggerSchema = z.infer<typeof triggerValidator>
