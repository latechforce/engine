import type { AppSchema } from '@/types'
import googleSheetsConnection from '@/example/connection/google/sheets'
import type { Handlers } from '@/script/mock'
import { handlers as googleHandlers } from '@/example/connection/google'
import { appendValuesResponse } from '@/e2e/__mocks__/google/sheets'

export const inGuides = false

export default {
  name: 'Append values to a Google Sheets',
  description: 'Automation with a Google Sheets append values action',
  automations: [
    {
      id: 1,
      name: 'append-values',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/append-values',
        },
      },
      actions: [
        {
          name: 'append-values',
          account: 'Google Sheets',
          service: 'google-sheets',
          action: 'append-values',
          params: {
            spreadsheetId: '1234567890',
            range: 'Sheet1!A1',
            values: [['John Doe', 'john.doe@example.com']],
          },
        },
      ],
    },
  ],
  connections: googleSheetsConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...googleHandlers,
  'https://sheets.googleapis.com/v4/spreadsheets/1234567890/values/Sheet1!A1:append': {
    POST: () => ({
      json: { data: appendValuesResponse },
    }),
  },
}
