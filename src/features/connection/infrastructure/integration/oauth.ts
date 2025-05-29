import type { Connection } from '@/connection/domain/entity/connection.entity'

export class OAuthIntegration {
  constructor(
    protected readonly connection: Connection,
    protected readonly authBaseUrl: string
  ) {}

  get redirectUri() {
    const { id } = this.connection.schema
    return this.connection.appBaseUrl + '/api/connections/auth?id=' + id
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
}
