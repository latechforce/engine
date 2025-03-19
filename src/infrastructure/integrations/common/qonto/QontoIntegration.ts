import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import {
  type QontoClient,
  type QontoClientInvoice,
  type QontoCreateClient,
  type QontoCreateClientInvoice,
  type QontoAttachment,
  type QontoError,
} from '/domain/integrations/Qonto/QontoTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class QontoIntegration implements IQontoIntegration {
  private _instance: AxiosInstance

  constructor(config?: QontoConfig) {
    const headers = {
      Authorization: `${config?.organisationSlug}:${config?.secretKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    switch (config?.environment) {
      case 'sandbox':
        this._instance = axios.create({
          baseURL: 'https://thirdparty-sandbox.staging.qonto.co/v2',
          headers: {
            ...headers,
            'X-Qonto-Staging-Token': config?.stagingToken,
          },
        })
        break
      default:
        this._instance = axios.create({
          baseURL: 'https://thirdparty.qonto.com/v2',
          headers,
        })
        break
    }
  }

  private _errorMapper = (
    response: AxiosResponse<{ errors: QontoError[] }>
  ): IntegrationResponseError => {
    const [{ status, code, detail }] = response.data.errors
    return {
      error: { status, code, detail },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/organization')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  createClient = async (client: QontoCreateClient) => {
    try {
      const response = await this._instance.post<{ client: QontoClient }>('/clients', client)
      return { data: response.data.client }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  createClientInvoice = async (invoice: QontoCreateClientInvoice) => {
    try {
      const response = await this._instance.post<{ client_invoice: QontoClientInvoice }>(
        '/client_invoices',
        invoice
      )
      return { data: response.data.client_invoice }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  listClientInvoices = async () => {
    try {
      const response = await this._instance.get<{ client_invoices: QontoClientInvoice[] }>(
        `/client_invoices`
      )
      return { data: response.data.client_invoices }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  retrieveAttachment = async (attachmentId: string) => {
    try {
      const response = await this._instance.get<{ attachment: QontoAttachment }>(
        `/attachments/${attachmentId}`
      )
      return { data: response.data.attachment }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
