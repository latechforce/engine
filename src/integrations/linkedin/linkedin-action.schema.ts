import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../features/action/domain/schema/base.integration'

const baseLinkedinActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('linkedin'),
})

const createLeadSubscriptionLinkedinActionSchema = baseLinkedinActionSchema
  .extend({
    action: z.literal('create-lead-notification-subscription'),
    params: z.object({
      webhook: z.string().url().meta({ title: 'Webhook URL' }),
      organizationId: z.string().meta({ title: 'LinkedIn Organization ID' }),
      leadType: z.enum(['SPONSORED']).default('SPONSORED').optional(),
    }),
  })
  .meta({
    title: 'Create Lead Notification Subscription (Owner Level)',
    description: 'Creates a LinkedIn Lead Notification subscription at owner (organization) level.',
  })

const listLeadSubscriptionsLinkedinActionSchema = baseLinkedinActionSchema
  .extend({
    action: z.literal('list-lead-notification-subscriptions'),
    params: z.object({
      organizationId: z.string().meta({ title: 'LinkedIn Organization ID' }),
    }),
  })
  .meta({
    title: 'Fetch Lead Notification Subscriptions (Owner Level)',
    description: 'Lists LinkedIn lead notification subscriptions for an organization.',
  })

export const linkedinActionSchema = z
  .union([createLeadSubscriptionLinkedinActionSchema, listLeadSubscriptionsLinkedinActionSchema])
  .meta({
    title: 'LinkedIn',
    description: 'Actions to interact with LinkedIn APIs',
  })

export type LinkedinActionSchema = z.infer<typeof linkedinActionSchema>
