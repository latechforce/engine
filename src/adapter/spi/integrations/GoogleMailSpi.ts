import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
  IGoogleMailSpi,
} from '/domain/integrations/Google/GoogleMail'

export interface IGoogleMailIntegration {
  getConfig: () => GoogleMailConfig
  sendEmail: (options: GoogleMailEmailOptions) => Promise<GoogleMailEmailResponse>
}

export class GoogleMailSpi implements IGoogleMailSpi {
  constructor(private _driver: IGoogleMailIntegration) {}

  getConfig = (): GoogleMailConfig => {
    return this._driver.getConfig()
  }

  sendEmail = async (options: GoogleMailEmailOptions): Promise<GoogleMailEmailResponse> => {
    return this._driver.sendEmail(options)
  }
}
