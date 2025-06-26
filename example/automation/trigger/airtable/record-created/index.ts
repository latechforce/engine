import type { AppSchema } from '@/types'
import airtableConnection from '@/example/connection/airtable'
import type { Handlers } from '@/script/mock'
import { handlers as airtableHandlers } from '../../../../connection/airtable'
import { listWebhooksResponse, createWebhookResponse } from '@/e2e/__mocks__/airtable'

export const inGuides = false

export default {
  name: 'Trigger an automation with a Airtable record created event',
  description: 'Automation with Airtable record created trigger',
  automations: [
    {
      id: 1,
      name: 'airtable',
      trigger: {
        service: 'airtable',
        event: 'record-created',
        account: 'Airtable',
        params: {
          baseId: 'appr2OtIBz5y0n1QD',
          tableId: 'tblLcwbEUvbzVqVJi',
        },
      },
      actions: [],
    },
  ],
  connections: airtableConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...airtableHandlers,
  'https://api.airtable.com/v0/bases/app123/webhooks': {
    GET: async () => ({
      json: listWebhooksResponse,
    }),
    POST: async () => ({
      json: createWebhookResponse,
    }),
  },
}
