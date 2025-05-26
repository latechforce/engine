import { z } from 'zod/v4'
import { baseCalendlyTriggerValidator } from './base'

export const inviteCreatedCalendlyTriggerValidator = baseCalendlyTriggerValidator
  .extend({
    event: z.literal('invite-created'),
    path: z.string(),
    organization: z.string().optional().meta({
      description: 'The organization of the trigger',
      default: 'Current user organization',
    }),
    scope: z.enum(['user', 'organization', 'group']).optional().meta({
      description: 'The scope of the trigger',
      default: 'user',
    }),
  })
  .meta({
    title: 'Invite Created',
    description:
      'The Calendly invite created trigger is a trigger that is triggered by a invite created event',
  })

export type InviteCreatedCalendlyTriggerSchema = z.infer<
  typeof inviteCreatedCalendlyTriggerValidator
>
