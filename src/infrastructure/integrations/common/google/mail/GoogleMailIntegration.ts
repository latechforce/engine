import * as nodemailer from 'nodemailer'
import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '../../../../../domain/integrations/Google/Mail/GoogleMail'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'

export class GoogleMailIntegration implements IGoogleMailIntegration {
  private _transporter: nodemailer.Transporter

  constructor(private _config?: GoogleMailConfig) {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: _config?.user,
        pass: _config?.password,
      },
    })
  }

  getConfig = (): GoogleMailConfig => {
    if (!this._config) {
      throw new Error('Google Mail config not set')
    }
    return this._config
  }

  sendEmail = async (options: GoogleMailEmailOptions): Promise<GoogleMailEmailResponse> => {
    const result = await new Promise<GoogleMailEmailResponse>((resolve, reject) =>
      this._transporter.sendMail(options, (error: Error | null, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    )
    return {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
      envelope: result.envelope,
    }
  }
}
