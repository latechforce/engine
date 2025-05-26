import type { AppSchema, Mock } from '@/types'
import facebookLeadAdsConnection, {
  mock as facebookLeadAdsMock,
} from '@/example/connection/facebook/lead-ads'

export const inGuides = false

export const mock: Mock = {
  ...facebookLeadAdsMock,
}

export default {
  name: 'Trigger an automation with a Facebook Lead Ads new lead event',
  description: 'Automation with Facebook Lead Ads new lead trigger',
  automations: [
    {
      name: 'facebook-lead-ads',
      trigger: {
        service: 'facebook-lead-ads',
        event: 'new-lead',
        path: '/facebook-lead-ads-new-lead',
        connection: 'Facebook Lead Ads',
      },
      actions: [],
    },
  ],
  connections: facebookLeadAdsConnection.connections,
} satisfies AppSchema
