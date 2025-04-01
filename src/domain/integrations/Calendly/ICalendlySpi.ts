import type { BaseSpi } from '../base'
import type { GetAuthorizationCodeParams, GetAuthorizationCodeResponse, GetAccessTokenParams, GetAccessTokenResponse, CalendlyError } from './CalendlyTypes'

export interface ICalendlySpi extends BaseSpi {
  getAuthorizationCode: (params: GetAuthorizationCodeParams) => Promise<{ data?: GetAuthorizationCodeResponse; error?: CalendlyError }>
  getAccessToken: (params: GetAccessTokenParams) => Promise<{ data?: GetAccessTokenResponse; error?: CalendlyError }>
}
