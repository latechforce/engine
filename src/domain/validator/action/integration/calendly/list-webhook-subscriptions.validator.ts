import { z } from 'zod/v4'
import { baseCalendlyActionValidator } from './base'

export const listWebhookSubscriptionsCalendlyActionValidator = baseCalendlyActionValidator
  .extend({
    action: z.literal('list-webhook-subscriptions'),
    organization: z.string(),
    scope: z.enum(['user', 'organization', 'group']),
    count: z.number().min(1).max(100).optional(),
  })
  .meta({
    title: 'List Webhook Subscriptions',
    description:
      'The Calendly list webhook subscriptions action is a action that lists the webhook subscriptions for a given organization',
  })

export type ListWebhookSubscriptionsCalendlyActionValidator = z.infer<
  typeof listWebhookSubscriptionsCalendlyActionValidator
>
