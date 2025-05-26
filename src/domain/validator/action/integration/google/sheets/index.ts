import { z } from 'zod/v4'
import { createSpreadsheetRowGoogleSheetsActionValidator } from './create-spreadsheet-row.validator'

export const googleSheetsActionValidator = z
  .union([createSpreadsheetRowGoogleSheetsActionValidator])
  .meta({
    title: 'Google Sheets',
    description:
      'The Google Sheets action is a action that is used to interact with the Google Sheets API',
  })

export type GoogleSheetsActionSchema = z.infer<typeof googleSheetsActionValidator>
