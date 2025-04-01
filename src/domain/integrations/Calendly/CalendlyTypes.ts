export type GetAuthorizationCodeParams = {
  clientId: string
  redirectUri: string
  codeChallengeMethod?: string
  codeChallenge?: string
}

export type GetAuthorizationCodeResponse = {
  code: string
}

export type GetAccessTokenParams = {
  clientId: string
  clientSecret: string
  grantType: 'authorization_code' | 'refresh_token'
  code?: string
  refreshToken?: string
  redirectUri?: string
  codeVerifier?: string
}

export type GetAccessTokenResponse = {
  tokenType: string
  accessToken: string
  refreshToken: string
  scope: string
  createdAt: number
  expiresIn: number
  owner: string
  organization: string
}

export type CalendlyError = {
  error: string
  errorDescription: string
}
