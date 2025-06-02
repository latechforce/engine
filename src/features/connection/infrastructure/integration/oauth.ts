export class OAuthIntegration {
  constructor(
    protected readonly connectionId: number,
    protected readonly clientId: string,
    protected readonly appBaseUrl: string,
    protected readonly authBaseUrl: string
  ) {}

  get redirectUri() {
    return this.appBaseUrl + '/api/connections/auth?id=' + this.connectionId
  }

  getAuthorizationUrl() {
    return `${this.authBaseUrl}/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }
}
