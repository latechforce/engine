import type { AppSchema, CodeContext } from '@/types'
import airtableConnection from '@/example/connection/airtable'
import { listWebhookPayloadsResponse } from '@/e2e/__mocks__/airtable'
import { handlers as airtableHandlers } from '../../../../connection/airtable'
import type { Handlers } from '@/script/mock'

export default {
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-typescript',
        },
      },
      actions: [
        {
          name: 'runTypescript',
          service: 'code',
          action: 'run-typescript',
          params: {
            code: String(async function (context: CodeContext) {
              const result = await context.action({
                name: 'list-webhook-payloads',
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
