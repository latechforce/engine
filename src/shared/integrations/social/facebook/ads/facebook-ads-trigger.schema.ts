import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../../../features/trigger/domain/schema/base.integration'

export const baseFacebookAdsTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('facebook-ads'),
})

export const newLeadFacebookAdsTriggerSchema = baseFacebookAdsTriggerSchema
  .extend({
    event: z.literal('new-lead'),
    params: z.object({
      pageId: z.string().meta({
        title: 'Facebook Page ID',
        description: 'The ID of the Facebook page with lead forms',
      }),
      appId: z.string().meta({
        title: 'Facebook App ID',
        description: 'Your Facebook App ID from the developer console',
      }),
      appSecret: z.string().meta({
        title: 'Facebook App Secret',
        description: 'Your Facebook App Secret from the developer console',
      }),
      verifyToken: z.string().optional().meta({
        title: 'Webhook Verify Token',
        description: 'Security token for webhook verification (auto-generated if not provided)',
      }),
    }),
  })
  .meta({
    title: 'New Lead',
    description: 'Triggered when a new Facebook Lead Ad response is created',
  })

export const facebookAdsTriggerSchema = z.union([newLeadFacebookAdsTriggerSchema]).meta({
  title: 'Facebook',
  description: 'The Facebook trigger is triggered by Facebook lead events',
})

export type FacebookAdsTriggerSchema = z.infer<typeof facebookAdsTriggerSchema>
