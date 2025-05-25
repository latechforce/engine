import { z } from 'zod/v4'
import { baseCalendlyTriggerValidator } from './base'

export const inviteCreatedCalendlyTriggerValidator = baseCalendlyTriggerValidator
  .extend({
    event: z.literal('invite-created'),
    path: z.string(),
    organization: z.string(),
    scope: z.enum(['user', 'organization', 'group']),
  })
  .meta({
    title: 'Invite Created',
    description:
      'The Calendly invite created trigger is a trigger that is triggered by a invite created event',
  })

export type InviteCreatedCalendlyTriggerSchema = z.infer<
  typeof inviteCreatedCalendlyTriggerValidator
>
