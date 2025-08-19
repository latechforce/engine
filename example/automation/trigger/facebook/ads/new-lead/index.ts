import type { AppSchema } from '@/types'
import facebookConnection from '@/example/connection/facebook/ads'
import type { Handlers } from '@/script/mock'
import { handlers as facebookHandlers } from '../../../../../connection/facebook/ads'

export const inGuides = false

export default {
  name: 'Trigger an automation with a Facebook new lead',
  description: 'Automation with Facebook new lead trigger',
  automations: [
    {
      id: 1,
      name: 'facebook-new-lead',
      trigger: {
        service: 'facebook-ads',
        event: 'new-lead',
        account: 'Facebook Ads',
        params: {
          pageId: '123456789',
          appId: '123456789',
        },
      },
      actions: [],
    },
  ],
  connections: facebookConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...facebookHandlers,
  // Versioned token endpoint
  'https://graph.facebook.com/v23.0/oauth/access_token': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }),
  },
  // Page subscriptions (matches trigger integration base URL)
  'https://graph.facebook.com/v23.0/123456789/subscribed_apps': {
    GET: async () => ({
      json: { data: [] },
    }),
    POST: async () => ({
      json: { success: true },
    }),
  },
  // App-level webhook subscription; in tests token.id === 1
  'https://graph.facebook.com/v23.0/1/subscriptions': {
    POST: async () => ({
      json: { success: true },
    }),
  },
}
