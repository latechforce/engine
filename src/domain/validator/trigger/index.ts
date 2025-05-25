import { z } from 'zod/v4'
import { httpTriggerValidator } from './service/http'
import { calendlyTriggerValidator } from './integration/calendly'

export const triggerValidator = z.union([httpTriggerValidator, calendlyTriggerValidator]).meta({
  title: 'Trigger',
  description: 'The trigger is the event that triggers the automation',
})

export type TriggerSchema = z.infer<typeof triggerValidator>
