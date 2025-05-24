import { z } from 'zod/v4'
import { inviteCreatedCalendlyTriggerValidator } from './invite-created.validator'

export const calendlyTriggerValidator = z.union([inviteCreatedCalendlyTriggerValidator]).meta({
  title: 'Calendly',
  description: 'The Calendly trigger is a trigger that is triggered by a Calendly event',
})

export type CalendlyTriggerSchema = z.infer<typeof calendlyTriggerValidator>
