import type { Connection } from '@/domain/entity/connection.entity'
import type { Token } from '@/domain/value-object/token.value-object'

export class OAuthIntegration {
  constructor(
    protected readonly connection: Connection,
    protected readonly baseUrl: string,
    protected readonly authBaseUrl: string
  ) {}

  get redirectUri() {
    const { id } = this.connection.schema
    return this.connection.appBaseUrl + '/api/connection/auth?id=' + id
  }

  get clientId() {
    if (!('clientId' in this.connection.schema)) {
      throw new Error('Client ID is not set')
    }
    return this.connection.schema.clientId
  }

  get clientSecret() {
    if (!('clientSecret' in this.connection.schema)) {
      throw new Error('Client secret is not set')
    }
    return this.connection.schema.clientSecret
  }

  getAuthorizationUrl() {
    return `${this.authBaseUrl}/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }

  getTokenHeader(token: Token) {
    return {
      Authorization: `Bearer ${token.access_token}`,
    }
  }
}
