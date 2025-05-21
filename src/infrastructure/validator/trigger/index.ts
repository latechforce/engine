import { z } from 'zod/v4'
import { httpTriggerValidator } from './http'

export const triggerValidator = httpTriggerValidator.meta({
  title: 'Trigger',
  description: 'The trigger is the event that triggers the automation',
})

export type TriggerSchema = z.infer<typeof triggerValidator>
