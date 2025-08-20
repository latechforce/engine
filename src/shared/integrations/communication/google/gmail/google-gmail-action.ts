import type { GoogleGmailActionSchema } from './google-gmail-action.schema'
import type { GoogleConnectionSchema } from '../google-connection.schema'
import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
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
        const { from, name, to, cc, bcc, subject, html, text } = this.actionSchema.params

        // Construct the From field with custom name if provided
        let fromField = from || 'me'
        if (name && from) {
          fromField = `"${name}" <${from}>`
        } else if (name) {
          // If only name is provided, we need to get the user's email from Gmail
          const profile = await gmail.users.getProfile({ userId: 'me' })
          const userEmail = profile.data.emailAddress
          fromField = `"${name}" <${userEmail}>`
        }

        // Helper function to format email addresses
        const formatEmails = (emails: string | string[] | undefined): string | undefined => {
          if (!emails) return undefined
          return Array.isArray(emails) ? emails.join(', ') : emails
        }

        // Generate boundary for multipart message
        const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

        let messageParts: string[]

        if (text && html) {
          // Multipart alternative message with both text and HTML
          messageParts = [
            `From: ${fromField}`,
            `To: ${formatEmails(to)}`,
            ...(cc ? [`Cc: ${formatEmails(cc)}`] : []),
            ...(bcc ? [`Bcc: ${formatEmails(bcc)}`] : []),
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/alternative; boundary="${boundary}"`,
            '',
            `--${boundary}`,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            text,
            '',
            `--${boundary}`,
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            html,
            '',
            `--${boundary}--`,
          ]
        } else {
          // Single part message (HTML only or text only)
          const contentType = text ? 'text/plain' : 'text/html'
          const content = text || html

          messageParts = [
            `From: ${fromField}`,
            `To: ${formatEmails(to)}`,
            ...(cc ? [`Cc: ${formatEmails(cc)}`] : []),
            ...(bcc ? [`Bcc: ${formatEmails(bcc)}`] : []),
            `Subject: ${subject}`,
            `Content-Type: ${contentType}; charset=UTF-8`,
            'MIME-Version: 1.0',
            '',
            content,
          ]
        }

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
          snippet: response.data.snippet,
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
