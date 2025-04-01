import type { ICalendlySpi } from './ICalendlySpi'
import { Integration } from '../base'
import type { GetAuthorizationCodeParams, GetAuthorizationCodeResponse, GetAccessTokenParams, GetAccessTokenResponse } from './CalendlyTypes'

export class Calendly extends Integration<ICalendlySpi> {
  constructor(spi: ICalendlySpi) {
    super(spi)
  }

  getAuthorizationCode = async (params: GetAuthorizationCodeParams): Promise<GetAuthorizationCodeResponse> => {
    const response = await this._spi.getAuthorizationCode(params)
    if (response.error) return this._throwError('getAuthorizationCode', response.error)
    return response.data
  }

  getAccessToken = async (params: GetAccessTokenParams): Promise<GetAccessTokenResponse> => {
    const response = await this._spi.getAccessToken(params)
    if (response.error) return this._throwError('getAccessToken', response.error)
    return response.data
  }
}
