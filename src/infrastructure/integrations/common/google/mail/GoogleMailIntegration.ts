import * as nodemailer from 'nodemailer'
import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/Mail'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'

export class GoogleMailIntegration implements IGoogleMailIntegration {
  private _transporter: nodemailer.Transporter

  constructor(config: GoogleMailConfig) {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.password,
      },
    })
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
