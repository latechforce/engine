import type { AppSchema, Mock } from '@/types'
import calendlyConnection, { mock as calendlyMock } from '@/example/connection/calendly'
import {
  createWebhookSubscriptionResponse,
  listWebhookSubscriptionsResponse,
} from '@/infrastructure/integration/calendly/__mock__'

export const mock: Mock = {
  ...calendlyMock,
  '/webhook_subscriptions': {
    GET: () => ({
      json: listWebhookSubscriptionsResponse,
    }),
    POST: () => ({
      json: createWebhookSubscriptionResponse,
    }),
  },
}

export default {
  name: 'Calendly invite created',
  description: 'Automation with Calendly invite created trigger',
  automations: [
    {
      name: 'calendly',
      trigger: {
        service: 'calendly',
        event: 'invite-created',
        path: '/calendly-invite-created',
        connection: 'Calendly',
      },
      actions: [],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema
