import ky from 'ky'
import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import type { NotionConnectionSchema } from './notion-connection.schema'
import type { NotionTokenResponse } from './notion.types'
import { Client } from '@notionhq/client'

export class NotionConnectionIntegration {
  public readonly tokenType = 'bearer'
  private readonly authBaseUrl = 'https://api.notion.com'

  constructor(
    private readonly schema: NotionConnectionSchema,
    private readonly redirectUri: string,
    private readonly state: string
  ) {}

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.schema.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      owner: 'user',
      state: this.state,
    })
    return `${this.authBaseUrl}/v1/oauth/authorize?${params.toString()}`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema
    const credentials = `${clientId}:${clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')

    const response = await ky
      .post(`${this.authBaseUrl}/v1/oauth/token`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        json: body,
      })
      .json<NotionTokenResponse>()

    return {
      id,
      token_type: 'Bearer',
      access_token: response.access_token,
      refresh_token: undefined,
      expires_in: undefined,
      scope: undefined,
      created_at: new Date(),
    }
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
    })
  }

  async getAccessTokenFromRefreshToken(_refreshToken: string): Promise<Token> {
    throw new Error('Notion does not support refresh tokens')
  }

  async check(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      const notion = new Client({
        auth: token.access_token,
      })

      await notion.users.me({})
      return true
    } catch {
      return false
    }
  }

  async getEmail(token: Token): Promise<string> {
    const notion = new Client({
      auth: token.access_token,
    })

    const user = await notion.users.me({})

    // Type guard to check if it's a full UserObjectResponse
    if ('type' in user && user.type === 'person' && 'person' in user && user.person?.email) {
      return user.person.email
    }

    if (
      'type' in user &&
      user.type === 'bot' &&
      'bot' in user &&
      user.bot?.owner?.type === 'user' &&
      'user' in user.bot.owner &&
      user.bot.owner.user &&
      'person' in user.bot.owner.user &&
      user.bot.owner.user.person?.email
    ) {
      return user.bot.owner.user.person.email
    }

    return ''
  }
}
