import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Start with a Facebook Lead Ads connection',
  description: 'App with a Facebook Lead Ads connection',
  connections: [
    {
      id: 1,
      name: 'Facebook Lead Ads',
      service: 'facebook-lead-ads',
      clientId: '{{env "FACEBOOK_LEAD_ADS_CLIENT_ID"}}',
      clientSecret: '{{env "FACEBOOK_LEAD_ADS_CLIENT_SECRET"}}',
    },
  ],
} satisfies AppSchema
