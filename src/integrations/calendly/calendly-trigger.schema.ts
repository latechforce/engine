import { z } from 'zod/v4'

import { baseIntegrationTriggerSchema } from '../../features/trigger/domain/schema/base.integration'

export const baseCalendlyTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('calendly'),
})

export const inviteCreatedCalendlyTriggerSchema = baseCalendlyTriggerSchema
  .extend({
    event: z.literal('invite-created'),
    params: z
      .object({
        organization: z.string().optional().meta({
          description: 'The organization of the trigger',
          default: 'Current user organization',
        }),
        scope: z.enum(['user', 'organization', 'group']).optional().meta({
          description: 'The scope of the trigger',
          default: 'user',
        }),
      })
      .optional(),
  })
  .meta({
    title: 'Invite Created',
    description:
      'The Calendly invite created trigger is a trigger that is triggered by a invite created event',
  })

export const calendlyTriggerSchema = z.union([inviteCreatedCalendlyTriggerSchema]).meta({
  title: 'Calendly',
  description: 'The Calendly trigger is a trigger that is triggered by a Calendly event',
})

export type CalendlyTriggerSchema = z.infer<typeof calendlyTriggerSchema>
