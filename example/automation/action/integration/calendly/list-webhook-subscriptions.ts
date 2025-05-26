import type { AppSchema, Mock } from '@/types'
import calendlyConnection, { mock as calendlyMock } from '@/example/connection/calendly'
import { listWebhookSubscriptionsResponse } from '@/infrastructure/integration/calendly/__mock__'

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
      name: 'list-webhook-subscriptions',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/list-webhook-subscriptions',
      },
      actions: [
        {
          name: 'list-webhook-subscriptions',
          connection: 'Calendly',
          service: 'calendly',
          action: 'list-webhook-subscriptions',
        },
      ],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema
