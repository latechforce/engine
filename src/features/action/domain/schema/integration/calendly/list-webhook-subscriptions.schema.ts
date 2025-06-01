import { z } from 'zod/v4'
import { baseCalendlyActionSchema } from './base'

export const listWebhookSubscriptionsCalendlyActionSchema = baseCalendlyActionSchema
  .extend({
    action: z.literal('list-webhook-subscriptions'),
    organization: z.string().optional().meta({
      default: 'Current user organisation',
    }),
    scope: z.enum(['user', 'organization', 'group']).optional().meta({
      default: 'user',
    }),
    count: z.number().min(1).max(100).optional().meta({
      default: 20,
    }),
  })
  .meta({
    title: 'List Webhook Subscriptions',
    description:
      'The Calendly list webhook subscriptions action is a action that lists the webhook subscriptions for a given organization',
  })

export type ListWebhookSubscriptionsCalendlyActionSchema = z.infer<
  typeof listWebhookSubscriptionsCalendlyActionSchema
>
