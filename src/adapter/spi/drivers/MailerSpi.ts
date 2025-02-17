import type { MailerEmailOptions, MailerEmailResponse } from '/domain/services/Mailer'

export interface IMailerDriver {
  sendEmail: (options: MailerEmailOptions) => Promise<MailerEmailResponse>
}

export class MailerSpi {
  constructor(private _driver: IMailerDriver) {}

  sendEmail = async (options: MailerEmailOptions): Promise<MailerEmailResponse> => {
    return this._driver.sendEmail(options)
  }
}
