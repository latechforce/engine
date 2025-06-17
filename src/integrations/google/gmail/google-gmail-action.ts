import type { GoogleGmailActionSchema } from './google-gmail-action.schema'
import type { GoogleConnectionSchema } from '../google-connection.schema'
import type { Token } from '../../../features/connection/domain/value-object/token.value-object'
import { google } from 'googleapis'

export class GoogleGmailActionIntegration {
  private readonly oauth2Client

  constructor(
    private readonly actionSchema: GoogleGmailActionSchema,
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
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client })
    switch (this.actionSchema.action) {
      case 'send-email': {
        const { to, subject, html } = this.actionSchema.sendEmailGoogleGmail
        const messageParts = [`To: ${to}`, `Subject: ${subject}`, '', html]
        const message = messageParts.join('\n')
        const encodedMessage = Buffer.from(message)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')
        const response = await gmail.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: encodedMessage,
          },
        })
        return {
          id: response.data.id,
          historyId: response.data.historyId,
          internalDate: response.data.internalDate,
          labelIds: response.data.labelIds,
          payload: response.data.payload,
          raw: response.data.raw,
          sizeEstimate: response.data.sizeEstimate,
          threadId: response.data.threadId,
        }
      }
      default: {
        const _exhaustiveCheck: never = this.actionSchema.action
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}
