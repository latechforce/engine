import type { AppSchema, Mock } from '@/types'
import calendlyConnection, { mock as calendlyMock } from '@/example/connection/calendly'
import {
  createWebhookSubscriptionResponse,
  listWebhookSubscriptionsResponse,
} from '@/infrastructure/integration/calendly/__mock__'

export const inGuides = false

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
  name: 'Trigger an automation with a Calendly invite created event',
  description: 'Automation with Calendly invite created trigger',
  automations: [
    {
      name: 'calendly',
      trigger: {
        service: 'calendly',
        event: 'invite-created',
        path: '/calendly-invite-created',
        account: 'Calendly',
      },
      actions: [],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema
