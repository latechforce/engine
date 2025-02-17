import * as nodemailer from 'nodemailer'
import type { MailerConfig, MailerEmailOptions, MailerEmailResponse } from '/domain/services/Mailer'
import type { IMailerDriver } from '/adapter/spi/drivers/MailerSpi'

export class NodemailerDriver implements IMailerDriver {
  private _transporter: nodemailer.Transporter

  constructor(config: MailerConfig) {
    this._transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    })
  }

  sendEmail = async (options: MailerEmailOptions): Promise<MailerEmailResponse> => {
    const result = await new Promise<MailerEmailResponse>((resolve, reject) =>
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
