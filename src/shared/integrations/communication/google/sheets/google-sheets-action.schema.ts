import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../../../features/action/domain/schema/base.integration'

const baseGoogleSheetsActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('google-sheets'),
})

const appendSpreadsheetValuesGoogleSheetsActionSchema = baseGoogleSheetsActionSchema
  .extend({
    action: z.literal('append-values'),
    params: z.object({
      spreadsheetId: z.string(),
      range: z.string(),
      values: z.array(z.array(z.string())),
    }),
  })
  .meta({
    title: 'Append values to a Google Sheets',
    description:
      'The Google Sheets append values action is a action that appends values to a Google Sheets spreadsheet',
  })

export const googleSheetsActionSchema = z
  .union([appendSpreadsheetValuesGoogleSheetsActionSchema])
  .meta({
    title: 'Google Sheets',
    description:
      'The Google Sheets action is a action that is used to interact with the Google Sheets API',
  })

export type GoogleSheetsActionSchema = z.infer<typeof googleSheetsActionSchema>
