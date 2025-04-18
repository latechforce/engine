import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import type {
  DeleteWebhookParams,
  DeleteWebhookResponse,
  JotformWebhookParams,
  JotformWebhookResponse,
} from '/domain/integrations/Jotform/JotformTypes'

export class JotformIntegration implements IJotformIntegration {
  private _instance: AxiosInstance

  constructor(public config: JotformConfig) {
    const { baseUrl = 'https://api.jotform.com', apiKey } = config
    const headers = {
      APIKEY: apiKey,
      'Content-Type': 'multipart/form-data',
    }
    this._instance = axios.create({
      baseURL: baseUrl,
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { message, status } = error.response.data as {
        message: string
        status: number
      }
      return {
        error: {
          message,
          status,
        },
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/user')
    } catch (error) {
      return this._responseError(error)
    }
  }

  listWebhooks = async (formId: string): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    try {
      const response = await this._instance.get(`/form/${formId}/webhooks`)
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }

  addWebhook = async (
    params: JotformWebhookParams
  ): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    try {
      const body = new FormData()
      body.append('webhookURL', params.webhookUrl)

      const response = await fetch(`${this.config.baseUrl}/form/${params.formId}/webhooks`, {
        method: 'POST',
        body,
        headers: {
          APIKEY: `${this.config.apiKey}`,
        },
      })

      const data = await response.json()
      return { data }
    } catch (error) {
      return this._responseError(error)
    }
  }

  deleteWebhook = async (
    params: DeleteWebhookParams
  ): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    try {
      const response = await this._instance.delete(
        `/form/${params.formId}/webhooks/${params.webhookId}`
      )
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
