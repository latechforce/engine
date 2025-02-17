import type {
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/Mail'

export interface IGoogleMailIntegration {
  sendEmail: (options: GoogleMailEmailOptions) => Promise<GoogleMailEmailResponse>
}

export class GoogleMailSpi {
  constructor(private _driver: IGoogleMailIntegration) {}

  sendEmail = async (options: GoogleMailEmailOptions): Promise<GoogleMailEmailResponse> => {
    return this._driver.sendEmail(options)
  }
}
