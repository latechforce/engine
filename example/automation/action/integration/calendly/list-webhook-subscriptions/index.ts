import type { AppSchema, Mock } from '@/types'
import calendlyConnection, { mock as calendlyMock } from '@/example/connection/calendly'
import { listWebhookSubscriptionsResponse } from '@/mocks/calendly'

export const inGuides = false

export const mock: Mock = {
  ...calendlyMock,
  '/webhook_subscriptions': {
    GET: () => ({
      json: listWebhookSubscriptionsResponse,
    }),
  },
}

export default {
  name: 'List Calendly webhook subscriptions',
  description: 'Automation with a Calendly list webhook subscriptions action',
  automations: [
    {
      id: 1,
      name: 'list-webhook-subscriptions',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/list-webhook-subscriptions',
      },
      actions: [
        {
          name: 'list-webhook-subscriptions',
          account: 'Calendly',
          service: 'calendly',
          action: 'list-webhook-subscriptions',
        },
      ],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema
