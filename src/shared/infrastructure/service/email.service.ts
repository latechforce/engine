import { Resend } from 'resend'

import type { EnvService } from './env.service'

export class EmailService {
  private emailFrom: string
  private supportEmails: string[]
  private resend: Resend | null = null

  constructor(env: EnvService) {
    const apiKey = env.get('RESEND_API_KEY')
    this.emailFrom = env.get('RESEND_EMAIL_FROM')
    this.supportEmails = env.get('SUPPORT_EMAILS').split(',')
    if (apiKey) {
      this.resend = new Resend(apiKey)
    }
  }

  async sendSupportEmail(subject: string, text: string): Promise<void> {
    if (this.resend) {
      await this.resend.emails.send({
        from: this.emailFrom,
        to: this.supportEmails,
        subject,
        text,
      })
    }
  }
}
