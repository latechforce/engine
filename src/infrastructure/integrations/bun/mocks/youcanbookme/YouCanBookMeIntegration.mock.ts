import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { YouCanBookMeProfile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'

type ProfileRecordFields = RecordFields & {
  createdBy: string
  accountId: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  subdomain: string
  logo: string
  timeZoneOverride: string
  captchaActive: string
  accessCode: string
  timeZone: string
  locale: string
  profileId: string
  status: string
  actions: string
  brandingType: string
}

export class YouCanBookMeIntegration
  extends BaseMockIntegration
  implements IYouCanBookMeIntegration
{
  private _profiles: SQLiteDatabaseTableDriver

  constructor(public config: YouCanBookMeConfig) {
    super(config, config.user.username)
    this._profiles = this._db.table({
      name: 'profiles',
      fields: [
        { name: 'createdBy', type: 'SingleLineText' },
        { name: 'accountId', type: 'SingleLineText' },
        { name: 'createdAt', type: 'SingleLineText' },
        { name: 'updatedAt', type: 'SingleLineText' },
        { name: 'title', type: 'SingleLineText' },
        { name: 'description', type: 'SingleLineText' },
        { name: 'subdomain', type: 'SingleLineText' },
        { name: 'logo', type: 'SingleLineText' },
        { name: 'timeZoneOverride', type: 'SingleLineText' },
        { name: 'captchaActive', type: 'SingleLineText' },
        { name: 'accessCode', type: 'SingleLineText' },
        { name: 'timeZone', type: 'SingleLineText' },
        { name: 'locale', type: 'SingleLineText' },
        { name: 'profileId', type: 'SingleLineText' },
        { name: 'status', type: 'SingleLineText' },
        { name: 'actions', type: 'SingleLineText' },
        { name: 'brandingType', type: 'SingleLineText' },
      ],
    })
    this._profiles.ensureSync()
  }

  createProfile = async (profile: YouCanBookMeProfile): Promise<void> => {
    await this._profiles.insert({
      id: profile.id,
      created_at: new Date().toISOString(),
      fields: {
        createdBy: profile.createdBy,
        accountId: profile.accountId,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        title: profile.title,
        description: profile.description,
        subdomain: profile.subdomain,
        logo: profile.logo,
        timeZoneOverride: profile.timeZoneOverride.toString(),
        captchaActive: profile.captchaActive.toString(),
        accessCode: profile.accessCode,
        timeZone: profile.timeZone,
        locale: profile.locale,
        profileId: profile.profileId,
        status: profile.status,
        actions: JSON.stringify(profile.actions),
        brandingType: profile.brandingType,
      },
    })
  }

  getProfile = async (profileId: string): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const profile = await this._profiles.readById<ProfileRecordFields>(profileId)
    if (!profile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    return {
      data: {
        id: profile.id,
        createdBy: profile.fields.createdBy,
        accountId: profile.fields.accountId,
        createdAt: profile.fields.createdAt,
        updatedAt: profile.fields.updatedAt,
        title: profile.fields.title,
        description: profile.fields.description,
        subdomain: profile.fields.subdomain,
        logo: profile.fields.logo,
        timeZoneOverride: profile.fields.timeZoneOverride === 'true',
        captchaActive: profile.fields.captchaActive === 'true',
        accessCode: profile.fields.accessCode,
        timeZone: profile.fields.timeZone,
        locale: profile.fields.locale,
        profileId: profile.fields.profileId,
        status: profile.fields.status as YouCanBookMeProfile['status'],
        actions: JSON.parse(profile.fields.actions),
        brandingType: profile.fields.brandingType as YouCanBookMeProfile['brandingType'],
      },
    }
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const existingProfile = await this._profiles.readById<ProfileRecordFields>(profileId)
    if (!existingProfile) {
      return { error: { status: 404, message: 'Profile not found' } }
    }
    const updatedProfile: YouCanBookMeProfile = {
      id: profileId,
      createdBy: existingProfile.fields.createdBy,
      accountId: existingProfile.fields.accountId,
      createdAt: existingProfile.fields.createdAt,
      updatedAt: existingProfile.fields.updatedAt,
      title: profile.title ?? existingProfile.fields.title,
      description: profile.description ?? existingProfile.fields.description,
      subdomain: profile.subdomain ?? existingProfile.fields.subdomain,
      logo: profile.logo ?? existingProfile.fields.logo,
      timeZoneOverride:
        profile.timeZoneOverride ?? existingProfile.fields.timeZoneOverride === 'true',
      captchaActive: profile.captchaActive ?? existingProfile.fields.captchaActive === 'true',
      accessCode: profile.accessCode ?? existingProfile.fields.accessCode,
      timeZone: profile.timeZone ?? existingProfile.fields.timeZone,
      locale: profile.locale ?? existingProfile.fields.locale,
      profileId: profile.profileId ?? existingProfile.fields.profileId,
      status: (profile.status ?? existingProfile.fields.status) as YouCanBookMeProfile['status'],
      actions: profile.actions ?? JSON.parse(existingProfile.fields.actions),
      brandingType: (profile.brandingType ??
        existingProfile.fields.brandingType) as YouCanBookMeProfile['brandingType'],
    }
    await this._profiles.update({
      id: profileId,
      updated_at: new Date().toISOString(),
      fields: {
        title: updatedProfile.title,
        description: updatedProfile.description,
        subdomain: updatedProfile.subdomain,
        logo: updatedProfile.logo,
        timeZoneOverride: updatedProfile.timeZoneOverride.toString(),
        captchaActive: updatedProfile.captchaActive.toString(),
        accessCode: updatedProfile.accessCode,
        timeZone: updatedProfile.timeZone,
        locale: updatedProfile.locale,
        status: updatedProfile.status,
        actions: JSON.stringify(updatedProfile.actions),
        brandingType: updatedProfile.brandingType,
      },
    })
    return { data: updatedProfile }
  }
}
