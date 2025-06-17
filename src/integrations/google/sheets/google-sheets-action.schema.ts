import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../features/action/domain/schema/base.integration'

const baseGoogleSheetsActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('google-sheets'),
})

const createSpreadsheetRowGoogleSheetsActionSchema = baseGoogleSheetsActionSchema
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

export const googleSheetsActionSchema = z
  .union([createSpreadsheetRowGoogleSheetsActionSchema])
  .meta({
    title: 'Google Sheets',
    description:
      'The Google Sheets action is a action that is used to interact with the Google Sheets API',
  })

export type GoogleSheetsActionSchema = z.infer<typeof googleSheetsActionSchema>
