import type { AppSchema } from '@/types'
import calendlyConnection from '@/example/connection/calendly'
import type { Handlers } from '@/script/mock'
import { handlers as calendlyHandlers } from '../../../../../connection/calendly'
import { listWebhookSubscriptionsResponse } from '@/e2e/__mocks__/calendly'

export const inGuides = false

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

export const handlers: Handlers = {
  ...calendlyHandlers,
  'https://api.calendly.com/webhook_subscriptions': {
    GET: () => ({
      json: listWebhookSubscriptionsResponse,
    }),
  },
}
