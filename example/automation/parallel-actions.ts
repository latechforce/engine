import type { Handlers } from '@/script/mock'
import type { AppSchema } from '@/types'
import { handlers as googleHandlers } from '@/example/connection/google'
import googleSheetsConnection from '@/example/connection/google/sheets'
import { appendValuesResponse } from '@/e2e/__mocks__/google/sheets'

export const inGuides = false

export default {
  name: 'Run TypeScript code action with array',
  description: 'Automation with run TypeScript code action with array',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypeScriptCode',
          params: {
            code: String(function () {
              const list = [
                {
                  name: 'John Doe',
                },
                {
                  name: 'Jane Doe',
                },
                {
                  name: 'Jacob Doe',
                },
              ]
              return list
            }),
          },
        },
        {
          service: 'google-sheets',
          action: 'append-values',
          name: 'appendValues',
          account: 'Google Sheets',
          params: {
            spreadsheetId: '1234567890',
            range: 'Sheet1!A1',
            values: [['{{runTypeScriptCode.name}}']],
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
    POST: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return {
        json: { data: appendValuesResponse },
      }
    },
  },
}
