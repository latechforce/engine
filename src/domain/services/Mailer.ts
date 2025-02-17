export interface MailerConfig {
  service: 'gmail'
  user: string
  pass: string
}

export interface MailerEmailOptions {
  from: string
  to: string
  subject: string
  text: string
  html?: string
}

export interface MailerEmailResponse {
  messageId: string
  accepted: string[]
  rejected: string[]
  response: string
  envelope: { from: string; to: string[] }
}

export interface IMailerSpi {
  sendEmail: (options: MailerEmailOptions) => Promise<MailerEmailResponse>
}

export class Mailer {
  constructor(private _spi: IMailerSpi) {}

  sendEmail = async (options: MailerEmailOptions): Promise<MailerEmailResponse> => {
    return this._spi.sendEmail(options)
  }
}
