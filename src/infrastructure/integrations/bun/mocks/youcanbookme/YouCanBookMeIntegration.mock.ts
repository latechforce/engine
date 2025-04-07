import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import { Database } from 'bun:sqlite'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import env from '/infrastructure/test/env'
import type { Profile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private db: Database
  private userId: string = env.TEST_YOUCANBOOKME_USERNAME

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
      accessCode TEXT,
      timeZone TEXT,
      locale TEXT,
      profileId TEXT,
      status TEXT,
      actions TEXT,
      brandingType TEXT
    )`)

    this.createProfile()
  }
  getProfile = async (profileId: string): Promise<IntegrationResponse<Profile>> => {
    const profile = this.db
      .query<Profile, string>('SELECT * FROM profiles WHERE id = ?')
      .get(profileId)
    if (!profile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    return { data: profile }
  }

  createProfile = async (): Promise<void> => {
    this.db.run(
      `INSERT INTO profiles (id, createdBy, accountId, createdAt, updatedAt, title, description, subdomain, logo, timeZoneOverride, captchaActive, accessCode, timeZone, locale, profileId, status, actions, brandingType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        'Europe/Paris',
        'fr-FR',
        'profile-123',
        'ONLINE',
        JSON.stringify([
          {
            id: 'action-123',
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            accountId: 'mock-account-123',
            profileId: 'profile-123',
            bookingId: 'booking-123',
            type: 'WEBHOOK',
            status: 'SUCCEEDED',
            anchor: 'BOOKING_CREATED',
            offsetMinutes: 0,
            firedAt: new Date().toISOString(),
            title: 'Booking Confirmation',
            to: 'customer@example.com',
            fromName: 'Mock Business',
            fromAddress: 'bookings@mockbusiness.com',
            subject: 'Your booking is confirmed',
            body: 'Thank you for booking with us!',
            creditsUsed: 1,
            attachIcs: true,
            headers: {},
            timeZone: 'Europe/Paris',
            displayTimeZone: 'Europe/Paris',
            withinQuota: true,
            ycbmBranded: false,
          },
        ]),
        'PAID_BRANDING',
      ]
    )
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<Profile>
  ): Promise<IntegrationResponse<Profile>> => {
    const existingProfile = this.db
      .query<Profile, string>('SELECT * FROM profiles WHERE id = ?')
      .get(profileId)
    if (!existingProfile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }

    const updatedProfile: Profile = { ...existingProfile, ...profile }
    this.db.run(
      `UPDATE profiles SET 
        title = ?, 
        description = ?, 
        subdomain = ?, 
        logo = ?, 
        timeZoneOverride = ?, 
        captchaActive = ?, 
        accessCode = ?, 
        timeZone = ?, 
        locale = ?, 
        status = ?, 
        brandingType = ? 
      WHERE id = ?`,
      [
        updatedProfile.title ?? '',
        updatedProfile.description ?? '',
        updatedProfile.subdomain ?? '',
        updatedProfile.logo ?? '',
        updatedProfile.timeZoneOverride ? 1 : 0,
        updatedProfile.captchaActive ? 1 : 0,
        updatedProfile.accessCode ?? '',
        updatedProfile.timeZone ?? '',
        updatedProfile.locale ?? '',
        updatedProfile.status ?? 'ONLINE',
        updatedProfile.brandingType ?? 'NO_BRANDING',
        profileId,
      ]
    )
    return { data: updatedProfile }
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
