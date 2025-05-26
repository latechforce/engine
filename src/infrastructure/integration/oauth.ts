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

  getAuthorizationUrl() {
    const { clientId } = this.connection.schema
    return `${this.authBaseUrl}/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }

  getTokenHeader(token: Token) {
    return {
      Authorization: `Bearer ${token.access_token}`,
    }
  }
}
