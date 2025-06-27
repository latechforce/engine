import type { AppSchema } from '@/types'
import airtableConnection from '@/example/connection/airtable'
import { listWebhookPayloadsResponse } from '@/e2e/__mocks__/airtable'
import { handlers as airtableHandlers } from '../../../../connection/airtable'
import type { Handlers } from '@/script/mock'

export default {
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'params',
          params: {
            // @ts-expect-error - CodeContext is not defined in JavaScript
            code: String(async function (context) {
              const result = await context.action({
                account: 'Airtable',
                service: 'airtable',
                action: 'list-webhook-payloads',
                params: {
                  baseId: 'app123',
                  webhookId: 'webhook123',
                },
              })
              return result
            }),
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
