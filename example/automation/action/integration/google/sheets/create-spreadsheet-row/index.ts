import type { AppSchema, Mock } from '@/types'
import googleSheetsConnection, {
  mock as googleSheetsMock,
} from '@/example/connection/google/sheets'

export const inGuides = false

export const mock: Mock = {
  ...googleSheetsMock,
}

export default {
  name: 'Create a Google Sheets row',
  description: 'Automation with a Google Sheets create row action',
  automations: [
    {
      name: 'create-spreadsheet-row',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/create-spreadsheet-row',
      },
      actions: [
        {
          name: 'create-spreadsheet-row',
          account: 'Google Sheets',
          service: 'google-sheets',
          action: 'create-spreadsheet-row',
        },
      ],
    },
  ],
  connections: googleSheetsConnection.connections,
} satisfies AppSchema
