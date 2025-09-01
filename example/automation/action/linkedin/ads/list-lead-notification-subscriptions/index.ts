import type { AppSchema } from '@/types'
import linkedinConnection from '@/example/connection/linkedin/ads'
import type { Handlers } from '@/script/mock'
import { handlers as linkedinHandlers } from '../../../../../connection/linkedin'

export const inGuides = false

export default {
  name: 'List LinkedIn lead notification subscriptions',
  description: 'Automation with a LinkedIn list lead notification subscriptions action',
  automations: [
    {
      id: 1,
      name: 'list-lead-notification-subscriptions',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/list-lead-notification-subscriptions',
        },
      },
      actions: [
        {
          name: 'list-lead-notification-subscriptions',
          account: 'LinkedIn Ads',
          service: 'linkedin-ads',
          action: 'list-lead-notification-subscriptions',
          params: {
            organizationId: '5622087',
          },
        },
      ],
    },
  ],
  connections: linkedinConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...linkedinHandlers,
  'https://api.linkedin.com/rest/leadNotifications': {
    GET: async () => ({
      json: {
        elements: [
          {
            owner: { organization: 'urn:li:organization:5622087' },
            id: 7012,
            leadType: 'SPONSORED',
            versionedForm: 'urn:li:versionedLeadGenForm:(urn:li:leadGenForm:6851219773716516864,1)',
            associatedEntity: { event: 'urn:li:event:123' },
            webhook: 'https://example.com/api/automation/1',
          },
        ],
      },
    }),
  },
}
