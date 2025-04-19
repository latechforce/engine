import type { GoogleMailEmailOptions, GoogleMailEmailResponse } from './GoogleMailTypes'
import type { IGoogleMailSpi } from './IGoogleMailSpi'
import { Integration, type BaseServices } from '../../base'
import type { GoogleMailConfig } from './GoogleMailConfig'

export class GoogleMail extends Integration<GoogleMailConfig, IGoogleMailSpi> {
  constructor(spis: IGoogleMailSpi[], services: BaseServices) {
    super('google-mail', spis, services)
  }

  sendEmail = async (
    account: string,
    options: GoogleMailEmailOptions
  ): Promise<GoogleMailEmailResponse> => {
    const response = await this._spi(account).sendEmail(options)
    if (response.error) return Integration.throwError('sendEmail', response.error)
    return response.data
  }
}
