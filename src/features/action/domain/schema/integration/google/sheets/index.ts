import { z } from 'zod/v4'
import { createSpreadsheetRowGoogleSheetsActionSchema } from './create-spreadsheet-row.schema'

export const googleSheetsActionSchema = z
  .union([createSpreadsheetRowGoogleSheetsActionSchema])
  .meta({
    title: 'Google Sheets',
    description:
      'The Google Sheets action is a action that is used to interact with the Google Sheets API',
  })

export type GoogleSheetsActionSchema = z.infer<typeof googleSheetsActionSchema>
