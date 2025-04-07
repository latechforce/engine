import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import { Database } from 'bun:sqlite'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private db: Database
  private userId: string = 'fake-user-id'

  constructor(private _config?: YouCanBookMeConfig) {
    this.db = new Database(':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      createdBy TEXT,
      accountId TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      title TEXT,
      description TEXT,
      subdomain TEXT,
      logo TEXT,
      timeZoneOverride INTEGER,
      captchaActive INTEGER,
      accessCode TEXT
    )`)

    this.createProfile()
  }

  createProfile = async (): Promise<void> => {
    this.db.run(
      `INSERT INTO profiles (id, createdBy, accountId, createdAt, updatedAt, title, description, subdomain, logo, timeZoneOverride, captchaActive, accessCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        this.userId,
        'mock-creator',
        'mock-account-123',
        new Date().toISOString(),
        new Date().toISOString(),
        'Mock Profile Title',
        'This is a mock profile description',
        'mock-subdomain',
        'https://mock-logo.png',
        0,
        0,
        'mock-access-code',
      ]
    )
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const profile = this.db
      .query<YouCanBookMeConfig, string>('SELECT * FROM profiles WHERE id = ?')
      .get(this.userId)
    if (!profile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    return undefined
  }
}
