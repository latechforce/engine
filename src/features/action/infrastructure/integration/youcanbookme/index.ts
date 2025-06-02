import type { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import type {
  YouCanBookMeProfile,
  YouCanBookMeWebhookAction,
} from '@/trigger/infrastructure/integration/youcanbookme/types'
import { BaseActionIntegration } from '../base'
import ky, { type KyInstance } from 'ky'
import type { Token } from 'typescript'

export class YouCanBookMeActionIntegration extends BaseActionIntegration {
  private readonly httpClient: KyInstance

  constructor(
    protected readonly baseUrl: string,
    private readonly username: string,
    private readonly password: string
  ) {
    super(baseUrl)
    this.httpClient = ky.create({
      prefixUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
      },
    })
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.getCurrentUser()
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false
    }
  }

  async runAction(action: IntegrationAction, token: Token): Promise<object> {
    const { schema } = action
    switch (schema.action) {
      default:
        throw new Error(`Unsupported action: ${schema.action}`)
    }
  }

  async getCurrentUser(): Promise<YouCanBookMeProfile> {
    return this.getProfile(this.username)
  }

  getProfile = async (profileId: string): Promise<YouCanBookMeProfile> => {
    const response = await this.httpClient.get(`profiles/${profileId}`)
    return response.json<YouCanBookMeProfile>()
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<YouCanBookMeProfile> => {
    const response = await this.httpClient.patch(`profiles/${profileId}`, {
      json: profile,
    })
    return response.json<YouCanBookMeProfile>()
  }

  currentProfile = async (): Promise<YouCanBookMeProfile> => {
    const response = await this.httpClient.get('profiles')
    return response.json<YouCanBookMeProfile>()
  }

  createProfile = async (profile: Partial<YouCanBookMeProfile>): Promise<YouCanBookMeProfile> => {
    const response = await this.httpClient.post('profiles', {
      json: profile,
    })
    return response.json<YouCanBookMeProfile>()
  }
}
