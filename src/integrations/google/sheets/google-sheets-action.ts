import type { GoogleSheetsActionSchema } from './google-sheets-action.schema'
import type { GoogleConnectionSchema } from '../google-connection.schema'
import type { Token } from '../../../features/connection/domain/value-object/token.value-object'
import { google } from 'googleapis'

export class GoogleSheetsActionIntegration {
  private readonly oauth2Client

  constructor(
    private readonly actionSchema: GoogleSheetsActionSchema,
    connectionSchema: GoogleConnectionSchema,
    redirectUri: string
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      connectionSchema.clientId,
      connectionSchema.clientSecret,
      redirectUri
    )
  }

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const { expires_in, scope, ...res } = token
    const expiry_date = new Date(Date.now() + (expires_in ?? 0) * 1000)
    this.oauth2Client.setCredentials({
      ...res,
      expiry_date: expiry_date.getTime(),
      scope: scope ?? undefined,
    })
    const sheets = google.sheets({ version: 'v4', auth: this.oauth2Client })
    switch (this.actionSchema.action) {
      case 'append-values': {
        const { spreadsheetId, range, values } = this.actionSchema.params
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values },
        })
        return {
          spreadsheetId: response.data.spreadsheetId,
          tableRange: response.data.tableRange,
          updates: {
            spreadsheetId: response.data.spreadsheetId,
            tableRange: response.data.tableRange,
            updatedCells: response.data.updates?.updatedCells,
            updatedColumns: response.data.updates?.updatedColumns,
            updatedData: {
              range: response.data.updates?.updatedData?.range,
              majorDimension: response.data.updates?.updatedData?.majorDimension,
              values: response.data.updates?.updatedData?.values,
            },
          },
        }
      }
      default: {
        const _exhaustiveCheck: never = this.actionSchema.action
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}
