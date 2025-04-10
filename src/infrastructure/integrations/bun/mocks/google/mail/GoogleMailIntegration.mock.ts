import { Database } from 'bun:sqlite'
import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '../../../../../../domain/integrations/Google/Mail/GoogleMail'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'

type Email = {
  id: number
  to: string
  subject: string
  body: string
  timestamp: string
}

export class GoogleMailIntegration implements IGoogleMailIntegration {
  private db: Database

  constructor(public config: GoogleMailConfig) {
    this.db = new Database(config.baseUrl ?? ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        "to" TEXT,
        subject TEXT,
        body TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  }

  sendEmail = async (options: GoogleMailEmailOptions): Promise<GoogleMailEmailResponse> => {
    const stmt = this.db.prepare('INSERT INTO emails ("to", subject, body) VALUES (?, ?, ?)')
    stmt.run(options.to ?? '', options.subject ?? '', options.text ?? '')
    return {
      messageId: `local-${Date.now()}`,
      accepted: [options.to],
      rejected: [],
      response: 'Logged in database',
      envelope: { to: [options.to], from: 'no-reply@example.com' },
    }
  }

  listEmails = async (): Promise<GoogleMailEmailResponse[]> => {
    const stmt = this.db.prepare<Email, []>('SELECT * FROM emails')
    return stmt.all().map((row) => ({
      messageId: `local-${row.id}`,
      accepted: [row.to],
      rejected: [],
      response: 'Logged in database',
      envelope: { to: [row.to], from: 'no-reply@example.com' },
    }))
  }
}
