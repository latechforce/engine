import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'
import { handlers as linkedinHandlers } from '../../../../../connection/linkedin'

export const inGuides = false

export default {
  name: 'LinkedIn webhook validation with invalid client secret',
  description:
    'Automation with LinkedIn automation using invalid client secret for webhook validation testing',
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
  connections: [
    {
      id: 1,
      name: 'LinkedIn Ads',
      service: 'linkedin-ads',
      clientId: '{{env "LINKEDIN_CLIENT_ID" "client_id"}}',
      clientSecret: '{{{env "LINKEDIN_CLIENT_SECRET" "invalid_client_secret"}}}', // Different secret
    },
  ],
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
        results: [], // No webhooks found initially - validation will be attempted
      },
    }),
    POST: async () => ({
      status: 400,
      json: {
        error: 'invalid_client_secret',
        error_description: 'The provided client secret is invalid',
      },
    }),
  },
}
