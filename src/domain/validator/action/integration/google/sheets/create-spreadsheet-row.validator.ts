import { z } from 'zod/v4'
import { baseGoogleSheetsActionValidator } from './base'

export const createSpreadsheetRowGoogleSheetsActionValidator = baseGoogleSheetsActionValidator
  .extend({
    action: z.literal('create-spreadsheet-row'),
  })
  .meta({
    title: 'Create a Google Sheets row',
    description:
      'The Google Sheets create row action is a action that creates a row in a Google Sheets spreadsheet',
  })

export type CreateSpreadsheetRowGoogleSheetsActionValidator = z.infer<
  typeof createSpreadsheetRowGoogleSheetsActionValidator
>
