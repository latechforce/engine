import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/Mail'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'
import { BaseMockIntegration } from '../../base'
import type { SQLiteDatabaseTableDriver } from '../../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { IntegrationResponse } from '/domain/integrations/base'

type EmailFields = {
  to_address: string
  subject: string
  body: string
  timestamp: string
}

type EmailRecordFields = RecordFields & EmailFields

export class GoogleMailIntegration extends BaseMockIntegration implements IGoogleMailIntegration {
  private _emails: SQLiteDatabaseTableDriver

  constructor(public config: GoogleMailConfig) {
    super(config, config.user)
    this._emails = this._db.table({
      name: 'emails',
      fields: [
        { name: 'to_address', type: 'SingleLineText' },
        { name: 'subject', type: 'SingleLineText' },
        { name: 'body', type: 'SingleLineText' },
        { name: 'timestamp', type: 'DateTime' },
      ],
    })
    this._emails.ensureSync()
  }

  sendEmail = async (
    options: GoogleMailEmailOptions
  ): Promise<IntegrationResponse<GoogleMailEmailResponse>> => {
    const timestamp = new Date().toISOString()
    await this._emails.insert({
      id: `email-${Date.now()}`,
      created_at: timestamp,
      fields: {
        to_address: options.to ?? '',
        subject: options.subject ?? '',
        body: options.text ?? '',
        timestamp,
      },
    })

    return {
      data: {
        messageId: `local-${Date.now()}`,
        accepted: [options.to],
        rejected: [],
        response: 'Logged in database',
        envelope: { to: [options.to], from: 'no-reply@example.com' },
      },
    }
  }

  listEmails = async (): Promise<IntegrationResponse<GoogleMailEmailResponse[]>> => {
    const rows = await this._emails.list<EmailRecordFields>()

    return {
      data: rows.map((row) => ({
        messageId: `local-${row.id}`,
        accepted: [row.fields.to_address],
        rejected: [],
        response: 'Logged in database',
        envelope: { to: [row.fields.to_address], from: 'no-reply@example.com' },
      })),
    }
  }
}
