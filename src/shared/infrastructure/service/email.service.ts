import { inject, injectable } from 'inversify'
import { Resend } from 'resend'

import TYPES from '../../application/di/types'

import type { EnvService } from './env.service'

@injectable()
export class EmailService {
  private emailFrom: string
  private resend: Resend | null = null

  constructor(
    @inject(TYPES.Service.Env)
    env: EnvService
  ) {
    const apiKey = env.get('RESEND_API_KEY')
    this.emailFrom = env.get('RESEND_EMAIL_FROM')
    if (apiKey) {
      this.resend = new Resend(apiKey)
    }
  }

  async sendEmail(emails: string[], subject: string, text: string): Promise<void> {
    if (this.resend) {
      await this.resend.emails.send({
        from: this.emailFrom,
        to: emails,
        subject,
        text,
      })
    }
  }
}
