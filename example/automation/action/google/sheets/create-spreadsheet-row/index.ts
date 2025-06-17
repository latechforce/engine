import type { AppSchema } from '@/types'
import googleSheetsConnection from '@/example/connection/google/sheets'

export const inGuides = false

export default {
  name: 'Create a Google Sheets row',
  description: 'Automation with a Google Sheets create row action',
  automations: [
    {
      id: 1,
      name: 'create-spreadsheet-row',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/create-spreadsheet-row',
        },
      },
      actions: [
        {
          name: 'create-spreadsheet-row',
          account: 'Google Sheets',
          service: 'google-sheets',
          action: 'create-spreadsheet-row',
          createSpreadsheetRowGoogleSheets: {
            spreadsheetId: '1234567890',
            sheetName: 'Sheet1',
            row: {
              name: 'John Doe',
              email: 'john.doe@example.com',
            },
          },
        },
      ],
    },
  ],
  connections: googleSheetsConnection.connections,
} satisfies AppSchema
