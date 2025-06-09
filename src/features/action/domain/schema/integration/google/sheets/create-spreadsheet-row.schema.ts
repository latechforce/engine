import { z } from 'zod/v4'
import { baseGoogleSheetsActionSchema } from './base'

export const createSpreadsheetRowGoogleSheetsActionSchema = baseGoogleSheetsActionSchema
  .extend({
    action: z.literal('create-spreadsheet-row'),
    createSpreadsheetRowGoogleSheets: z.object({
      spreadsheetId: z.string(),
      sheetName: z.string(),
      row: z.record(z.string(), z.string()),
    }),
  })
  .meta({
    title: 'Create a Google Sheets row',
    description:
      'The Google Sheets create row action is a action that creates a row in a Google Sheets spreadsheet',
  })

export type CreateSpreadsheetRowGoogleSheetsActionSchema = z.infer<
  typeof createSpreadsheetRowGoogleSheetsActionSchema
>
