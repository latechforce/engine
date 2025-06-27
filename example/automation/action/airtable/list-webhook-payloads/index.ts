import type { AppSchema } from '@/types'
import airtableConnection from '@/example/connection/airtable'
import type { Handlers } from '@/script/mock'
import { handlers as airtableHandlers } from '../../../../connection/airtable'
import { listWebhookPayloadsResponse } from '@/e2e/__mocks__/airtable'

export const inGuides = false

export default {
  name: 'List Airtable webhook payloads',
  description: 'Automation with a Airtable list webhook payloads action',
  automations: [
    {
      id: 1,
      name: 'list-webhook-payloads',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/list-webhook-payloads',
        },
      },
      actions: [
        {
          name: 'list-webhook-payloads',
          account: 'Airtable',
          service: 'airtable',
          action: 'list-webhook-payloads',
          params: {
            baseId: 'app123',
            webhookId: 'webhook123',
          },
        },
      ],
    },
  ],
  connections: airtableConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...airtableHandlers,
  'https://api.airtable.com/v0/bases/app123/webhooks/webhook123/payloads': {
    GET: async () => ({
      json: listWebhookPayloadsResponse,
    }),
  },
}
