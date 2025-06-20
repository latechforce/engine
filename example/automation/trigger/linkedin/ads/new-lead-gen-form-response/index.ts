import type { AppSchema } from '@/types'
import linkedinAdsConnection from '@/example/connection/linkedin/ads'

export const inGuides = false

export default {
  name: 'Trigger an automation with a LinkedIn Ads new lead gen form response event',
  description: 'Automation with LinkedIn Ads new lead gen form response trigger',
  automations: [
    {
      id: 1,
      name: 'linkedin-ads',
      trigger: {
        service: 'linkedin-ads',
        event: 'new-lead-gen-form-response',
        account: 'LinkedIn Ads',
      },
      actions: [],
    },
  ],
  connections: linkedinAdsConnection.connections,
} satisfies AppSchema
