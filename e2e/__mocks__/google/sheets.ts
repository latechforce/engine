import type { AppendValuesResponse } from '../../../src/integrations/google/sheets/google-sheets.types'

export const appendValuesResponse: AppendValuesResponse = {
  spreadsheetId: '123',
  tableRange: 'Sheet1!A1',
  updates: {
    spreadsheetId: '123',
    tableRange: 'Sheet1!A1',
    updatedCells: 1,
    updatedColumns: 1,
    updatedData: {
      range: 'Sheet1!A1',
      majorDimension: 'ROWS',
      values: [['John Doe', 'john.doe@example.com']],
    },
  },
}
