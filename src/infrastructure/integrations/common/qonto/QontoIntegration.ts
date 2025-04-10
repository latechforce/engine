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
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { join } from 'path'
export class QontoIntegration implements IQontoIntegration {
  private _instance: AxiosInstance

  constructor(public config: QontoConfig) {
    const {
      baseUrl = 'https://thirdparty.qonto.com',
      organisationSlug,
      secretKey,
      stagingToken,
    } = config
    const headers: { [key: string]: string } = {
      Authorization: `${organisationSlug}:${secretKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    if (stagingToken) {
      headers['X-Qonto-Staging-Token'] = stagingToken
    }
    this._instance = axios.create({
      baseURL: join(baseUrl, 'v2'),
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const [{ status, detail }] = error.response.data.errors as QontoError[]
      return {
        error: { status, message: detail },
      }
    }
    throw error
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/organization')
    } catch (error) {
      return this._responseError(error)
    }
  }

  createClient = async (client: QontoCreateClient) => {
    try {
      const response = await this._instance.post<{ client: QontoClient }>('/clients', client)
      return { data: response.data.client }
    } catch (error) {
      return this._responseError(error)
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
      return this._responseError(error)
    }
  }

  listClientInvoices = async () => {
    try {
      const response = await this._instance.get<{ client_invoices: QontoClientInvoice[] }>(
        `/client_invoices`
      )
      return { data: response.data.client_invoices }
    } catch (error) {
      return this._responseError(error)
    }
  }

  retrieveAttachment = async (attachmentId: string) => {
    try {
      const response = await this._instance.get<{ attachment: QontoAttachment }>(
        `/attachments/${attachmentId}`
      )
      return { data: response.data.attachment }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
