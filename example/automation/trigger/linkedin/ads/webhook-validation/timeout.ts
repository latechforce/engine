import type { AppSchema } from '@/types'
import linkedinConnection from '@/example/connection/linkedin/ads'
import type { Handlers } from '@/script/mock'
import { handlers as linkedinHandlers } from '../../../../../connection/linkedin'

export const inGuides = false

export default {
  name: 'Trigger an automation with a LinkedIn new lead gen form response',
  description: 'Automation with LinkedIn new lead gen form response trigger',
  automations: [
    {
      id: 1,
      name: 'linkedin-new-lead',
      trigger: {
        service: 'linkedin-ads',
        event: 'new-lead-gen-form-response',
        account: 'LinkedIn Ads',
        params: {
          organizationId: '{{env "LINKEDIN_ORGANIZATION_ID" "5622087"}}',
          sponsoredAccountId: '{{env "LINKEDIN_SPONSORED_ACCOUNT_ID" "1234567890"}}',
        },
      },
      actions: [],
    },
  ],
  connections: linkedinConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...linkedinHandlers,
  'https://www.linkedin.com/oauth/v2/accessToken': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        expires_in: 3600,
      },
    }),
  },
  'https://api.linkedin.com/rest/leadNotifications': {
    GET: async () => ({
      json: {
        results: [], // No webhooks found - validation will fail
      },
    }),
    POST: async () => ({
      status: 408,
      json: {
        error: 'Request timeout',
        error_description: 'The request timed out while validating webhook',
      },
    }),
  },
}
