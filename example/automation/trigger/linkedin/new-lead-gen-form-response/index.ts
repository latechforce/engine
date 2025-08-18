import type { AppSchema } from '@/types'
import linkedinConnection from '@/example/connection/linkedin'
import type { Handlers } from '@/script/mock'
import { handlers as linkedinHandlers } from '../../../../connection/linkedin'

export const inGuides = false

export default {
  name: 'Trigger an automation with a LinkedIn new lead gen form response',
  description: 'Automation with LinkedIn new lead gen form response trigger',
  automations: [
    {
      id: 1,
      name: 'linkedin-new-lead',
      trigger: {
        service: 'linkedin',
        event: 'new-lead-gen-form-response',
        account: 'LinkedIn',
        params: {
          organizationId: '5622087',
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
        results: [],
      },
    }),
    POST: async () => ({
      json: {
        id: '7012',
        status: 'CREATED',
      },
    }),
  },
}
