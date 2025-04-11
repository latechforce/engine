import * as nodemailer from 'nodemailer'
import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/Mail'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { IntegrationResponse } from '/domain/integrations/base'

export class GoogleMailIntegration implements IGoogleMailIntegration {
  private _transporter: nodemailer.Transporter

  constructor(public config: GoogleMailConfig) {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.password,
      },
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof Error && error) {
      const { message } = error
      return {
        error: { status: 500, message },
      }
    }
    throw error
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._transporter.verify()
    } catch (error) {
      return this._responseError(error)
    }
  }

  sendEmail = async (
    options: GoogleMailEmailOptions
  ): Promise<IntegrationResponse<GoogleMailEmailResponse>> => {
    try {
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
        data: {
          messageId: result.messageId,
          accepted: result.accepted,
          rejected: result.rejected,
          response: result.response,
          envelope: result.envelope,
        },
      }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
