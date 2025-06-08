import type { AppSchema } from '@/types'
import facebookLeadAdsConnection from '@/example/connection/facebook/lead-ads'

export const inGuides = false

export default {
  name: 'Trigger an automation with a Facebook Lead Ads new lead event',
  description: 'Automation with Facebook Lead Ads new lead trigger',
  automations: [
    {
      id: 1,
      name: 'facebook-lead-ads',
      trigger: {
        service: 'facebook-lead-ads',
        event: 'new-lead',
        path: '/facebook-lead-ads-new-lead',
        account: 'Facebook Lead Ads',
      },
      actions: [],
    },
  ],
  connections: facebookLeadAdsConnection.connections,
} satisfies AppSchema
