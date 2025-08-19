import type { AppSchema } from '@/types'
import facebookConnection from '@/example/connection/facebook/ads'
import type { Handlers } from '@/script/mock'
import { handlers as facebookHandlers } from '../../../../../connection/facebook/ads'

export const inGuides = false

export default {
  name: 'List Facebook app subscriptions',
  description: 'Automation with a Facebook list app subscriptions action',
  automations: [
    {
      id: 1,
      name: 'list-app-subscriptions',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/list-app-subscriptions',
        },
      },
      actions: [
        {
          name: 'list-app-subscriptions',
          account: 'Facebook Ads',
          service: 'facebook-ads',
          action: 'list-app-subscriptions',
          params: {
            appId: '123456',
          },
        },
      ],
    },
  ],
  connections: facebookConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...facebookHandlers,
  'https://graph.facebook.com/v23.0/123456/subscriptions': {
    GET: async () => ({
      json: {
        data: [
          {
            object: 'page',
            callback_url: 'https://example.com/api/automations/1',
            fields: ['leadgen'],
          },
        ],
      },
    }),
  },
}
