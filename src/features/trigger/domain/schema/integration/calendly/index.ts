// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { inviteCreatedCalendlyTriggerSchema } from './invite-created.schema'

export const calendlyTriggerSchema = z.union([inviteCreatedCalendlyTriggerSchema]).meta({
  title: 'Calendly',
  description: 'The Calendly trigger is a trigger that is triggered by a Calendly event',
})

export type CalendlyTriggerSchema = z.infer<typeof calendlyTriggerSchema>
