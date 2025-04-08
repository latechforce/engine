import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import { Database } from 'bun:sqlite'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { YouCanBookMeProfile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private db: Database

  constructor(private _config?: YouCanBookMeConfig) {
    this.db = new Database(_config?.baseUrl + ':memory:')
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
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const profile = this.db
      .query<YouCanBookMeConfig, string>('SELECT * FROM profiles WHERE id = ?')
      .get(this._config?.user.username ?? '')
    if (!profile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    return undefined
  }

  createProfile = async (profile: YouCanBookMeProfile): Promise<void> => {
    this.db.run(
      `INSERT INTO profiles (id, createdBy, accountId, createdAt, updatedAt, title, description, subdomain, logo, timeZoneOverride, captchaActive, accessCode, timeZone, locale, profileId, status, actions, brandingType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.id,
        profile.createdBy,
        profile.accountId,
        profile.createdAt,
        profile.updatedAt,
        profile.title,
        profile.description,
        profile.subdomain,
        profile.logo,
        profile.timeZoneOverride,
        profile.captchaActive,
        profile.accessCode,
        profile.timeZone,
        profile.locale,
        profile.profileId,
        profile.status,
        JSON.stringify(profile.actions),
        profile.brandingType,
      ]
    )
  }

  getProfile = async (profileId: string): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const profile = this.db
      .query<YouCanBookMeProfile, string>('SELECT * FROM profiles WHERE id = ?')
      .get(profileId)
    if (!profile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    return { data: profile }
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const existingProfile = this.db
      .query<YouCanBookMeProfile, string>('SELECT * FROM profiles WHERE id = ?')
      .get(profileId)
    if (!existingProfile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }

    const updatedProfile: YouCanBookMeProfile = { ...existingProfile, ...profile }
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
}
