import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../features/action/domain/schema/base.integration'

const baseCalendlyActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('calendly'),
})

const listWebhookSubscriptionsCalendlyActionSchema = baseCalendlyActionSchema
  .extend({
    action: z.literal('list-webhook-subscriptions'),
    listWebhookSubscriptionsCalendly: z.object({
      organization: z.string().optional().meta({
        default: 'Current user organisation',
      }),
      scope: z.enum(['user', 'organization', 'group']).optional().meta({
        default: 'user',
      }),
      count: z.number().min(1).max(100).optional().meta({
        default: 20,
      }),
    }),
  })
  .meta({
    title: 'List Webhook Subscriptions',
    description:
      'The Calendly list webhook subscriptions action is a action that lists the webhook subscriptions for a given organization',
  })

export const calendlyActionSchema = z.union([listWebhookSubscriptionsCalendlyActionSchema]).meta({
  title: 'Calendly',
  description: 'The Calendly action is a action that is used to interact with the Calendly API',
})

export type CalendlyActionSchema = z.infer<typeof calendlyActionSchema>
