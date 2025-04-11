import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import axios, { AxiosError, type AxiosInstance } from 'axios'

export class GoCardlessIntegration implements IGoCardlessIntegration {
  private _instance: AxiosInstance

  constructor(public config: GoCardlessConfig) {
    const { accessToken, baseUrl = 'https://api.gocardless.com' } = config
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'GoCardless-Version': '2015-07-06',
    }
    this._instance = axios.create({
      baseURL: baseUrl,
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response
      return {
        error: { status, message: data.error },
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/health_check')
    } catch (error) {
      return this._responseError(error)
    }
  }

  createPayment = async (
    payment: GoCardlessCreatePayment
  ): Promise<IntegrationResponse<GoCardlessPayment>> => {
    try {
      const { mandate, ...rest } = payment
      const response = await this._instance.post('/payments', {
        payments: {
          ...rest,
          links: {
            mandate,
          },
        },
      })
      return {
        data: response.data.payments,
      }
    } catch (error) {
      return this._responseError(error)
    }
  }

  listPayments = async (
    params: GoCardlessListPayment = {}
  ): Promise<IntegrationResponse<GoCardlessPaymentList>> => {
    try {
      const response = await this._instance.get('/payments', { params })
      return {
        data: response.data,
      }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
