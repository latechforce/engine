export interface GoogleMailConfig {
  user: string
  password: string
}

export interface GoogleMailEmailOptions {
  from: string
  to: string
  subject: string
  text: string
  html?: string
}

export interface GoogleMailEmailResponse {
  messageId: string
  accepted: string[]
  rejected: string[]
  response: string
  envelope: { from: string; to: string[] }
}

export interface IGoogleMailSpi {
  getConfig: () => GoogleMailConfig
  sendEmail: (options: GoogleMailEmailOptions) => Promise<GoogleMailEmailResponse>
}

export class GoogleMail {
  constructor(private _spi: IGoogleMailSpi) {}

  getConfig = (): GoogleMailConfig => {
    return this._spi.getConfig()
  }

  sendEmail = async (options: GoogleMailEmailOptions): Promise<GoogleMailEmailResponse> => {
    return this._spi.sendEmail(options)
  }
}
