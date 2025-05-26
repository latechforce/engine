import type { AppSchema, Mock } from '@/types'
import linkedinAdsConnection, { mock as linkedinAdsMock } from '@/example/connection/linkedin/ads'

export const inGuides = false

export const mock: Mock = {
  ...linkedinAdsMock,
}

export default {
  name: 'Trigger an automation with a LinkedIn Ads new lead gen form response event',
  description: 'Automation with LinkedIn Ads new lead gen form response trigger',
  automations: [
    {
      name: 'linkedin-ads',
      trigger: {
        service: 'linkedin-ads',
        event: 'new-lead-gen-form-response',
        path: '/linkedin-ads-new-lead-gen-form-response',
        account: 'LinkedIn Ads',
      },
      actions: [],
    },
  ],
  connections: linkedinAdsConnection.connections,
} satisfies AppSchema
