import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../../../features/action/domain/schema/base.integration'

const baseLinkedinActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('linkedin-ads'),
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

const getLeadFormResponseLinkedinActionSchema = baseLinkedinActionSchema
  .extend({
    action: z.literal('get-lead-form-response'),
    params: z.object({
      leadResponseId: z.string().meta({
        title: 'Lead Response ID',
        description:
          'The unique identifier for the lead form response (e.g., urn:li:leadFormResponse:123456)',
      }),
    }),
  })
  .meta({
    title: 'Get Single Lead Form Response',
    description: 'Retrieves a single LinkedIn Lead Form Response by its ID.',
  })

export const linkedinAdsActionSchema = z
  .union([
    createLeadSubscriptionLinkedinActionSchema,
    listLeadSubscriptionsLinkedinActionSchema,
    getLeadFormResponseLinkedinActionSchema,
  ])
  .meta({
    title: 'LinkedIn Ads',
    description: 'Actions to interact with LinkedIn Ads APIs',
  })

export type LinkedinAdsActionSchema = z.infer<typeof linkedinAdsActionSchema>
