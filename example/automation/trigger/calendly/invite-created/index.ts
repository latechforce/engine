import type { AppSchema } from '@/types'
import calendlyConnection from '@/example/connection/calendly'
import type { Handlers } from '@/script/mock'
import { handlers as calendlyHandlers } from '../../../../connection/calendly'
import {
  listWebhookSubscriptionsResponse,
  createWebhookSubscriptionResponse,
} from '@/e2e/__mocks__/calendly'

export const inGuides = false

export default {
  name: 'Trigger an automation with a Calendly invite created event',
  description: 'Automation with Calendly invite created trigger',
  automations: [
    {
      id: 1,
      name: 'calendly',
      trigger: {
        service: 'calendly',
        event: 'invite-created',
        account: 'Calendly',
      },
      actions: [],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...calendlyHandlers,
  'https://api.calendly.com/webhook_subscriptions': {
    GET: async () => ({
      json: listWebhookSubscriptionsResponse,
    }),
    POST: async () => ({
      json: createWebhookSubscriptionResponse,
    }),
  },
}
